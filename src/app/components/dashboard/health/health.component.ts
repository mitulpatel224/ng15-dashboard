import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
})
export class HealthComponent {
  // TODO: Make data as input
  public data = [
    { title: 'Time', value: '14% ahead of schedule.' },
    { title: 'Tasks', value: '12 tasks to be completed.' },
    { title: 'Workload', value: '0 tasks overdue' },
    { title: 'Progress', value: '14% completed.' },
    { title: 'Cost', value: '42% under budget.' },
  ];
}
