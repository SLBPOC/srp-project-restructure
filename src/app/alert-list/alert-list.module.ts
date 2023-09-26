import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertListRoutingModule } from './alert-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlertListComponent } from './alert-list.component';
import { AlertCategoriesChartComponent } from './components/alert-categories-chart/alert-categories-chart.component';
import { AlertCategoriesTableComponent } from './components/alert-categories-table/alert-categories-table.component';
import { WellListModule } from '../well-list/well-list.module';
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
    AlertListRoutingModule,
    WellListModule
  ]
})
export class AlertListModule { }
