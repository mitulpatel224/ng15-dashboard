import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.boxPadding = 200;
Chart.defaults.font.size = 16;
// Chart.defaults.plugins.colors.enabled = true;

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {}
  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;

    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Not Started', 'Completed', 'In Progress'],
        datasets: [
          {
            data: [10, 2, 6],
            // backgroundColor: [
            //   '#9da4ad',
            //   '#69c66a',
            //   '#4fcbc2',
            //   '#df5a9d',
            //   '#f0504c',
            //   '#53d2f9',
            //   '#4199e0',
            //   '#f5a752',
            // ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              // padding: 40,
              pointStyle: 'circle',
            },
          },
        },
      },
    });
  }
}
