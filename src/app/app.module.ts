import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/core/components/sidebar/sidebar.component';
import { TopbarComponent } from './components/core/components/topbar/topbar.component';
Chart.register(...registerables, ChartDataLabels);
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.padding = 20;
Chart.defaults.plugins.legend.align = 'start';
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#36A2EB';
Chart.defaults.color = '#cdcdcd';
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.aspectRatio = 1;
Chart.defaults.responsive = true;
Chart.defaults.font.size = 14;
Chart.defaults.scale.grid.color = '#222533';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopbarComponent,
    SidebarComponent,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
