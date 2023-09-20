import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ClassificationSummaryComponent } from './components/classification-summary/classification-summary.component';
import { ParameterChartComponent } from './components/parameter-chart/parameter-chart.component';
import { WellPerformanceComponent } from './components/well-performance/well-performance.component';
import { YesterdayPercentRunComponent } from './components/yesterday-percent-run/yesterday-percent-run.component';
import { YesterdayCycleCountComponent } from './components/yesterdays-cycle-count/yesterday-cycle-count.component';
import { YesterdayCycleBarChartComponent } from './components/yesterdays-cycle-count/components/yesterday-cycle-bar-chart/yesterday-cycle-bar-chart.component';
import { ModalContentComponent } from './components/yesterdays-cycle-count/components/modal-content/modal-content.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ClassificationSummaryComponent,
    ParameterChartComponent,
    WellPerformanceComponent,
    YesterdayPercentRunComponent,
    YesterdayCycleCountComponent,
    YesterdayCycleBarChartComponent,
    ModalContentComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
