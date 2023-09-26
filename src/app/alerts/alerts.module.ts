import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsRoutingModule } from './alerts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlertListComponent } from './alert-list.component';
import { AlertCategoriesChartComponent } from './components/alert-categories-chart/alert-categories-chart.component';
import { AlertCategoriesTableComponent } from './components/alert-categories-table/alert-categories-table.component';
import { WellListModule } from '../wells/wells.module';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';

@NgModule({
  declarations: [
    AlertListComponent,
    AlertCategoriesChartComponent,
    AlertCategoriesTableComponent,
    CustomAlertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlertsRoutingModule,
    WellListModule
  ]
})
export class AlertsModule { }
