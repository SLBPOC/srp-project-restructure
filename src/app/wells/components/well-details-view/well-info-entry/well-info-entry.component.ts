import { Component, } from '@angular/core';
import { EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCustomFeedComponent } from '../../well-info/create-custom-feed/create-custom-feed.component';

interface Food {
  value: string;
  viewValue: string;
};

interface Device {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  status: string;
  time: String;
  name: String;
  prev_data: number;
  current_value: string;
  avg_hrs: String;
  infered_prod: number;
  pump_fillage: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 1, current_value: '1', avg_hrs: '-', infered_prod: 1, pump_fillage: '' },
  { status: 'low', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '2', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'med', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '2', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '1', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '1', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '1', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '1', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '1', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '1', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'low', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '0', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '0', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'low', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 66, current_value: '0', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'med', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '55', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'high', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 55, current_value: '44', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' },
  { status: 'low', time: '2023-06-21 13:14:59 UTC', name: '10 Point Count', prev_data: 0, current_value: '0', avg_hrs: 'Hz', infered_prod: 1, pump_fillage: '' }
];
@Component({
  selector: 'app-well-info-entry',
  templateUrl: './well-info-entry.component.html',
  styleUrls: ['./well-info-entry.component.scss'],
})

export class WellInfoEntryComponent {
  ReadMore: boolean = true
  visible: boolean = false
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  devices: Device[] = [
    { value: 'Anderson_718-1', viewValue: 'Anderson_718-1' },
    { value: 'Anderson_7182', viewValue: 'Anderson_718-2' },
    { value: 'Anderson_718-3', viewValue: 'Anderson_718-3' },
    { value: 'Anderson_718-4', viewValue: 'Anderson_718-4' },
  ];

  displayedColumns: string[] = ['status', 'time', 'name', 'prev_data', 'current_value', 'avg_hrs', 'infered_prod', 'pump_fillage'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }


  toppings = this._formBuilder.group({
    EffectiveRunTime: false,
    CyclesToday: false,
    StructuralLoad: false,
    MinMaxLoad: false,
    GearboxLoad: false,
    RodStress: false
  });
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public _location: Location) { }

  createCustomFeed() {
    const dialogRef = this.dialog.open(CreateCustomFeedComponent);
  }

}
