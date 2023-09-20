import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  status: string;
  well_name: string;
  alerts_level: string;
  time_date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump Tagging', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' },
  { status: '', well_name: '2020-05-14 13:14:59', alerts_level: 'Pump tagging 1', time_date: '74.26%' }

];
@Component({
  selector: 'app-generic-tabs',
  templateUrl: './generic-tabs.component.html',
  styleUrls: ['./generic-tabs.component.scss'],

})
export class GenericTabsComponent {
  displayedColumns: string[] = ['status', 'well_name', 'alerts_level', 'time_date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
}
