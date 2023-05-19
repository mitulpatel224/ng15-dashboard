import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { PieChartComponent } from '../../shared/pie-chart/pie-chart.component';
import { HealthComponent } from '../health/health.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, HealthComponent, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
