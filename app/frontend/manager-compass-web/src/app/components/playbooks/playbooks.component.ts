import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Topic } from '../../models/topic.model';
import { TopicIconComponent } from '../../shared/topic-icon.component';

@Component({
  selector: 'app-playbooks',
  standalone: true,
  imports: [CommonModule, TopicIconComponent],
  templateUrl: './playbooks.component.html'
})
export class PlaybooksComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getTopics().subscribe(topics => (this.topics = topics));
  }
}
