import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertList } from 'src/app/shared/models/alert-list';
import { WellModel } from 'src/app/shared/models/wellModel';
import { AlertListService } from 'src/app/shared/services/alert-list.service';
import { WellsService } from 'src/app/shared/services/wells.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent {
  wellList!: AlertList[];
  @ViewChild('menuTrigger') trigger: any;
  dataSource: any;
  displayedColumns: string[] = ["stat", "wellName", "alertLevel", "date", "desc", "status", "action"]
  highCount = 0;
  medCount = 0;
  lowCount = 0;
  clearedCount = 0;
  searchText: any;
  pageNumber = 1;
  pageSize: number = 5;
  model: any = {};
  seachByStatus: string = "";
  loading = true;
  WellList!: WellModel[];
  clearAlertsComments!: string;
  snoozeByTime: string = '1h';
  noOfDaysCalendar!: string;

  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AlertListService, private wellService: WellsService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe(params => {
      this.searchText = params['id']
    });

    this.getAlertListFilters("");
  }

  clearSearch() {
    this.searchText = "";
    this.getAlertListFilters('');
  }

  refreshFilter() {
    this.resetDateRangeFilters();
    this.getAlertListFilters('');
  }

  submitSnoozeBy(alert: any, snoozeByDialog: any) {
    const payload = {
      alertId: alert.alertId,
      snoozeBy: this.snoozeByTime
    }
    this.service.snoozeBy(payload).subscribe((data: any) => {
      this.closeDialog(snoozeByDialog);
    })
  }

  submitClearAlerts(alert: any, comment: string, clearAlertDialog: any) {
    const payload = {
      alertId: alert.alertId,
      comment: comment
    }
    this.service.clearAlert(payload).subscribe((data: any) => {
      this.closeDialog(clearAlertDialog);
    })
  }

  submitCalendarFilters(calendarFilterDialog: any) {
    this.getAlertListFilters('');
    this.closeDialog(calendarFilterDialog);
  }

  setDateSelected(option: any) {
    this.noOfDaysCalendar = option;
    this.getAlertListFilters('');

  }

  resetDateRangeFilters() {
    this.dataSource.filter = '';
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

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

  navigateToWellList() {
    this.router.navigateByUrl("/wells")
  }

  getAlertListFilters(searchStatus: string) {
    const payload = {
      ...this.createModel(),
      searchStatus,
      dateRange: {
        fromDate: this.selectedRangeValue?.start?.toISOString() ?? '',
        toDate: this.selectedRangeValue?.end?.toISOString() ?? ''
      },
      calendarDays: this.noOfDaysCalendar
    }

    this.loading = true;
    this.service.getAlertListFilters(payload).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        // console.log('search response:- ', response)
        this.loading = false;
        this.WellList = response.data;
        // this.WellList.forEach(x => this.prepareChart(x));
        this.dataSource = new MatTableDataSource<WellModel>(this.WellList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.highCount = response.totalHigh;
        this.medCount = response.totalMedium;
        this.lowCount = response.totalLow;
        this.clearedCount = response.totalCleared;
      } else {
        this.searchText = "";
      }
    })
  }


  createModel(this: any) {
    this.model.pageSize = this.pageSize;
    this.model.pageNumber = this.pageNumber;
    this.model.searchText = this.searchText ? this.searchText : "";
    this.model.sortColumn = this.sortColumn ? this.sortColumn : "";
    this.model.sortDirection = this.sortDirection ? this.sortDirection : "";
    this.model.searchStatus = this.seachByStatus ? this.seachByStatus : "";

    return this.model;


  }

  closeMenu() {
    this.trigger.closeMenu()
  }

  closeDialog(dialog: any) {
    dialog.close.emit();

  }

}
