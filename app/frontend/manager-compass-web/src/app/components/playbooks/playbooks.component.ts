import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Topic } from '../../models/topic.model';
import { TopicIconComponent } from '../../shared/topic-icon.component';

interface TopicGroup {
  label: string;
  topics: Topic[];
}

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
  selector: 'app-playbooks',
  standalone: true,
  imports: [CommonModule, TopicIconComponent],
  templateUrl: './playbooks.component.html'
})
export class PlaybooksComponent implements OnInit {
  topicGroups: TopicGroup[] = [];
  selected: Topic | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getTopics().subscribe(topics => {
      this.topicGroups = GROUP_ORDER.map(label => ({
        label,
        topics: topics.filter(t => GROUP_MAP[t.key] === label)
      })).filter(g => g.topics.length > 0);

      this.selected = topics[0] ?? null;
    });
  }

  select(topic: Topic): void {
    this.selected = topic;
  }
}
