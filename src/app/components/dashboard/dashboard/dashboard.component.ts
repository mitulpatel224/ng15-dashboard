import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from '../../card/card.component';
import { HealthComponent } from '../health/health.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, HealthComponent, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public pieChartPlugins = [
    {
      id: 'paddingBelowLegends',
      beforeInit(chart: any) {
        const fiValue = chart.legend.fit;
        chart.legend.fit = function () {
          fiValue.bind(chart.legend)();
          return (this.height += 30);
        };
      },
    },
  ];

  public tasks: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['Not Started', 'Completed', 'In Progress'],
      datasets: [
        {
          label: 'Tasks',
          data: [10, 6, 2],
          backgroundColor: [
            '#9da4ad',
            '#69c66a',
            '#4fcbc2',
            '#df5a9d',
            '#f0504c',
            '#53d2f9',
            '#4199e0',
            '#f5a752',
          ],
          borderWidth: 3,
          borderColor: '#101320',
        },
      ],
    },
    options: {
      cutout: '80%',
      maintainAspectRatio: false,

      plugins: {
        datalabels: {
          // clip: true,
          // clamp: true,
          anchor: 'center',
          align: 'end',
          offset: 20,
          color: '#CDCDCD',
        },
        legend: {
          labels: {
            boxPadding: 20,
            color: '#ffffff',
            generateLabels: (chart: any) => {
              const datasets = chart.data.datasets;
              return datasets[0].data.map((data: any, i: number) => ({
                text: `${chart?.data?.labels[i]} (${data})`,
                fontColor: '#ababab',
                fillStyle: datasets[0].backgroundColor[i],
                index: i,
              }));
            },
          },
        },
      },
    },
  };
}
