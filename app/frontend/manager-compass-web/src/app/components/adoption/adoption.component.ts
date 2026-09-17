import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AdoptionMetrics } from '../../models/adoption.model';
import { TopicIconComponent } from '../../shared/topic-icon.component';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [CommonModule, TopicIconComponent],
  templateUrl: './adoption.component.html'
})
export class AdoptionComponent implements OnInit {
  metrics: AdoptionMetrics | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAdoptionMetrics().subscribe(m => (this.metrics = m));
  }

  adoptionPct(m: AdoptionMetrics): number {
    return Math.round((m.activeManagers / m.eligibleManagers) * 100);
  }

  maxCount(m: AdoptionMetrics): number {
    return Math.max(...m.topTopics.map(t => t.count), 1);
  }

  barHeightPct(value: number, values: number[]): number {
    const max = Math.max(...values);
    return Math.round((value / max) * 100);
  }
}
