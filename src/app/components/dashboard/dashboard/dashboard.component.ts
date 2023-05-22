import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, Plugin } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from '../../card/card.component';
import { HealthComponent } from '../health/health.component';

const paddingBelowLegends: Plugin<'doughnut' | 'bar'> = {
  id: 'paddingBelowLegends',
  beforeInit(chart: any) {
    const fiValue = chart.legend.fit;
    chart.legend.fit = function () {
      fiValue.bind(chart.legend)();
      return (this.height += 30);
    };
  },
};

const chartAreaBorder: Plugin<'bar'> = {
  id: 'chartAreaBorder',
  beforeDraw(chart: any, options: any) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options['borderColor'] || '#101320';
    ctx.lineWidth = options['borderWidth'] || 10;
    ctx.setLineDash(options['borderDash'] || []);
    ctx.lineDashOffset = options['borderDashOffset'];
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, HealthComponent, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public paddingBelowLegends = paddingBelowLegends;
  public chartAreaBorder = chartAreaBorder;

  public tasks: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['Not Started', 'Completed', 'In Progress'],
      datasets: [
        {
          label: 'Tasks',
          data: [10, 6, 2],
          backgroundColor: ['#9da4ad', '#69c66a', '#4fcbc2'],
        },
      ],
    },
    options: {
      cutout: '80%',
      borderColor: '#101320',
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
          align: 'center',
          labels: {
            boxPadding: 0,
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

  public cost: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [''],
      datasets: [
        {
          label: 'Actual',
          data: [3200],
          backgroundColor: ['#69c66a'],
          barThickness: 50,
        },
        {
          label: 'Planned',
          data: [4510],
          backgroundColor: ['#50cbc2'],
          barThickness: 50,
        },
        {
          label: 'Budget',
          data: [6000],
          backgroundColor: ['#42abf5'],
          barThickness: 50,
        },
      ],
    },
    options: {
      elements: {
        bar: {
          borderWidth: { left: 5, right: 5 },
          borderColor: 'transparent',
        },
      },
      scales: {
        x: {
          border: {
            display: false,
          },
        },
        y: {
          display: true,
          border: {
            display: false,
          },
          ticks: {
            stepSize: 1500,
            callback: (val: any) => {
              return (val as number) / 1000 + 'k';
            },
          },
        },
      },
      bar: {
        datasets: {
          barPercentage: 0.5,
          barThickness: 1,
          borderColor: '',
        },
      },
      plugins: {
        datalabels: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
        legend: {
          align: 'start',
          fullSize: true,
        },
      },
    },
    plugins: [],
  };

  public workload: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['Mike', 'Jennifer', 'Brandon', 'Sam', 'George'],
      datasets: [
        {
          label: 'Completed',
          data: [4, 2, 0, 0, 0],
          backgroundColor: '#69cc6c',
          barPercentage: 0.4,
        },
        {
          label: 'Remaining',
          data: [0, 2, 1, 2.5, 1],
          backgroundColor: '#5fe0d2',
          barPercentage: 0.4,
        },
        {
          label: 'Overdue',
          data: [0, 0, 0, 0, 0],
          backgroundColor: '#f0504c',
          barPercentage: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      bar: {
        datasets: {
          barPercentage: 0.2,
        },
      },
      scales: {
        x: {
          max: 8,
          stacked: true,
          border: {
            display: false,
          },
          ticks: {
            stepSize: 2,
            sampleSize: 10,
          },
        },
        y: {
          stacked: true,
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            padding: 20,
          },
        },
      },
      borderColor: 'transparent',
      plugins: {
        datalabels: {
          display: false,
        },
      },
    },
  };

  public progress: ChartConfiguration<
    'bar',
    { category: string; value: number }[]
  > = {
    type: 'bar',
    data: {
      labels: [
        'Contract',
        'Design',
        'Procurement',
        'Construction',
        'Post Construction',
        'Project Closed',
      ],
      datasets: [
        {
          label: 'Progress',
          data: [
            {
              category: 'Contract',
              value: 100,
            },
            {
              category: 'Design',
              value: 80,
            },
            {
              category: 'Procurement',
              value: 19,
            },
            {
              category: 'Construction',
              value: 0,
            },
            {
              category: 'Post Construction',
              value: 0,
            },
            {
              category: 'Project Closed',
              value: 0,
            },
          ],
          backgroundColor(bgColor: any) {
            const val = bgColor.raw.value;
            let color =
              val > 70
                ? '#6acb66'
                : val > 40
                ? '#f8a847'
                : val > 10
                ? '#e0589d'
                : '#808490';
            return color;
          },
          minBarLength: 5,
          barPercentage: 0.4,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          border: {
            display: false,
          },
          ticks: {
            crossAlign: 'far',
            padding: 15,
          },
        },
        x: {
          border: {
            display: false,
          },
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
      },
      parsing: {
        xAxisKey: 'value',
        yAxisKey: 'category',
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          align: 'start',
          anchor: 'start',
          color: (context: any) => {
            return context.dataset.data.map(
              (data: { category: string; value: number }, i: number) => {
                return data.value > 70
                  ? '#6acb66'
                  : data.value > 40
                  ? '#f8a847'
                  : data.value > 10
                  ? '#e0589d'
                  : '#808490';
              }
            );
          },
          formatter: (value: any) => {
            return value.value + '%';
          },
        },
      },
    },
  };

  public time: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['Planned Completion', 'Actual Completion', 'Ahead', '', '', ''],
      datasets: [
        {
          label: 'Actual',
          data: [],
          // barThickness: 25,
          backgroundColor: '#3facf4',
          barPercentage: 1,
          categoryPercentage: 1,
          stack: '1',
        },
        {
          label: 'Behind',
          data: [],
          // barThickness: 25,
          backgroundColor: '#f7a651',
          categoryPercentage: 1,
          stack: '2',
        },
        {
          label: 'On Time',
          data: [0, 14, 14],
          // barThickness: 25,
          backgroundColor: '#66ce6a',
          categoryPercentage: 1,
          stack: '1',
        },
      ],
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          grid: {
            display: false,
          },
        },
        x: {
          min: -100,
          max: 100,
          stacked: true,
          ticks: {
            stepSize: 25,
            callback: (val: any) => Math.abs(val),
          },
          border: {
            display: false,
          },
          grid: {
            drawTicks: false,
          },
        },
      },
      parsing: {
        xAxisKey: 'value',
        yAxisKey: 'category',
      },
      plugins: {
        datalabels: {
          align: 'start',
          anchor: 'start',
          formatter: (value: any) => {
            return `${value}%`;
          },
          color(context: any) {
            return context.dataset.backgroundColor;
          },
        },
      },
    },
  };
}
