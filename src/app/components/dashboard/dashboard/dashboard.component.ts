import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { HealthComponent } from '../health/health.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, HealthComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
