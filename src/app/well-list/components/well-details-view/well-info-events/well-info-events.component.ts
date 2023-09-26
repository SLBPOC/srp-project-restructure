import { Component, EventEmitter, Input, Output,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  status: string;
  well_name: String;
  pump_status: String;
  time_data: number;
  structural_load: string;
  avg_hrs:number;
  infered_prod:number;
  pump_fillage:number;
  mode_operation:number;
  stat:number;

  
}

const ELEMENT_DATA: PeriodicElement[] = [
  { status:'high', well_name: 'Apache1', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '30%',avg_hrs:1, infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '60%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'med', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '10%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'high', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '50%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '90%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'high', well_name: 'Apache1', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '30%',avg_hrs:1, infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '60%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'med', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '10%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'high', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '50%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '90%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1}
];

@Component({
  selector: 'app-well-info-events',
  templateUrl: './well-info-events.component.html',
  styleUrls: ['./well-info-events.component.scss']
})
export class WellInfoEventsComponent {

  displayedColumns: string[] = ['status','well_name', 'pump_status', 'time_data', 'structural_load','avg_hrs','infered_prod','pump_fillage','mode_operation','stat'];
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

    
    foods: Food[] = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'},
    ];

    toppings = this._formBuilder.group({
      EffectiveRunTime: false,
      CyclesToday: false,
      StructuralLoad: false,
      MinMaxLoad: false,
      GearboxLoad: false,
      RodStress: false
    });
    constructor(private _formBuilder: FormBuilder) {}

}
