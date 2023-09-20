import { Component, } from '@angular/core';
import { EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  // {status:'',time: 2, 'Pump Status': 'Helium', weight: 4.0026, symbol: 'He'},
  // {status:'',time: 3, 'Pump Status': 'Lithium', weight: 6.941, symbol: 'Li'},
  // {status:'',time: 4, 'Pump Status': 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {status:'',time: 5, 'Pump Status': 'Boron', weight: 10.811, symbol: 'B'},
  // {status:'',time: 6, 'Pump Status': 'Carbon', weight: 12.0107, symbol: 'C'},
  // {status:'',time: 7, 'Pump Status': 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {status:'',time: 8, 'Pump Status': 'Oxygen', weight: 15.9994, symbol: 'O'},

];
@Component({
  selector: 'app-well-info-entry',
  templateUrl: './well-info-entry.component.html',
  styleUrls: ['./well-info-entry.component.scss'],


})

export class WellInfoEntryComponent {

  //readmore variable, its true than read more string will print
  ReadMore: boolean = true

  //hiding info box
  visible: boolean = false


  //onclick toggling both
  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
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
  /*gateway table start here*/
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



  /*gateway table end here*/
  ///////////////////////////////////////////////
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
    // console.warn("@");
    // this.enabled = true;
    const dialogRef = this.dialog.open(CreateCustomFeedComponent);
  }

}
