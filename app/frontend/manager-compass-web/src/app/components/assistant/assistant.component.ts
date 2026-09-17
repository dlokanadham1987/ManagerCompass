import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Topic, AskResponse } from '../../models/topic.model';
import { TopicIconComponent } from '../../shared/topic-icon.component';

interface CurrentAnswer {
  question: string;
  response: AskResponse | null;
  loading: boolean;
}

interface TopicGroup {
  label: string;
  topics: Topic[];
}

interface PromptChip {
  text: string;
  color: string;
  key: string;
}

const STARTER_KEYS = ['engagement', 'compensation', 'retention', 'recruiting', 'onboarding'];

const GROUP_ORDER = ['Hiring', 'People & Performance', 'Pay & Policy'];
const GROUP_MAP: Record<string, string> = {
  recruiting: 'Hiring',
  onboarding: 'Hiring',
  engagement: 'People & Performance',
  retention: 'People & Performance',
  performance: 'People & Performance',
  teamhealth: 'People & Performance',
  compensation: 'Pay & Policy',
  payroll: 'Pay & Policy',
  policy: 'Pay & Policy'
};

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, TopicIconComponent],
  templateUrl: './assistant.component.html'
})
export class AssistantComponent implements OnInit {
  topicGroups: TopicGroup[] = [];
  starterTopics: Topic[] = [];
  current: CurrentAnswer | null = null;
  activeKey: string | null = null;
  activeTopic: Topic | null = null;
  inputText = '';

  constructor(private api: ApiService) {}

  get promptsHeading(): string {
    return this.activeTopic ? `More on ${this.activeTopic.label}` : 'Try one of these';
  }

  get promptChips(): PromptChip[] {
    if (this.activeTopic?.examplePrompts.length) {
      return this.activeTopic.examplePrompts.map(text => ({
        text,
        color: this.activeTopic!.color,
        key: this.activeTopic!.key
      }));
    }
    return this.starterTopics.map(t => ({ text: t.prompt, color: t.color, key: t.key }));
  }

  askPromptChip(chip: PromptChip): void {
    this.activeKey = chip.key;
    this.submitAsk(chip.text, chip.key);
  }

  ngOnInit(): void {
    this.api.getTopics().subscribe(topics => {
      this.topicGroups = GROUP_ORDER.map(label => ({
        label,
        topics: topics.filter(t => GROUP_MAP[t.key] === label)
      })).filter(g => g.topics.length > 0);

      this.starterTopics = STARTER_KEYS
        .map(key => topics.find(t => t.key === key))
        .filter((t): t is Topic => !!t);
    });
  }

  askTopic(topic: Topic): void {
    this.activeKey = topic.key;
    this.submitAsk(topic.prompt, topic.key);
  }

  onSubmit(): void {
    const text = this.inputText.trim();
    if (!text) return;
    this.activeKey = null;
    this.inputText = '';
    this.submitAsk(text);
  }

  private submitAsk(text: string, topicKey?: string): void {
    // Replaces whatever is currently shown — selecting a new topic or asking a new
    // question always swaps the middle panel's content rather than stacking a history.
    const entry: CurrentAnswer = { question: text, response: null, loading: true };
    this.current = entry;

    this.api
      .ask(text, topicKey)
      .pipe(delay(350))
      .subscribe(response => {
        if (this.current !== entry) return; // a newer request superseded this one
        entry.response = response;
        entry.loading = false;
        if (response.type === 'topic' && response.topic) {
          this.activeTopic = response.topic;
        } else {
          this.activeTopic = null;
        }
      });
  }
}
