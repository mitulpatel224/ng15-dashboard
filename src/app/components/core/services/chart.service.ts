import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.padding = 20;
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#36A2EB';
Chart.defaults.color = '#000';
Chart.defaults.responsive = true;
Chart.defaults.resizeDelay = 100;
Chart.defaults.font.size = 14;
Chart.defaults.aspectRatio = 1;

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}
}
