import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WellsService } from '../../../shared/services/wells.service';
import { EventListService } from '../../../shared/services/event-list.service';


@Component({
  selector: 'app-event-filter-and-sort',
  templateUrl: './event-filter-and-sort.component.html',
  styleUrls: ['./event-filter-and-sort.component.scss']
})
export class EventFilterAndSortComponent {
  @Output('filterRefresh') filterRefresh: EventEmitter<any> =
    new EventEmitter();
  panelOpenState!: boolean;
  panelOpenState2!: boolean;
  panelOpenState3!: boolean;
  panelOpenState4!: boolean;
  panelOpenState5!: boolean;
  panelOpenState6!: boolean;
  panelOpenState7!: boolean;
  wellList!: any[];
  wellFormControl = new FormControl();
  providers = new FormControl();
  selectedWellNames = new FormControl();
  selectedCategories = new FormControl();
  allProviders!: any;
  commsStatusOptions!: any;
  controllerStatusOptions!: any;
  pumpingTypeOptions!: any;
  selectedWells = [];
  eventSelectedWells = [];
  eventTypesWell = [];
  selectedCategory = [];
  wellNames: any;
  category: any;
  eventType = [];
  evnts = [];
  testEvent: boolean = false;
  filtersApplied = {
    wellNames: false,
    commsStatus: false,
    controllerStatus: false,
    pumpingTypes: false,
    spm: false,
    pumpFillage: false,
    inferredProduction: false,
    category: false,
    eventType: false,
  };
  @Input() isEvent!: any;

  filteredProviders: any[] = this.allProviders;
  alertLevels: any;

  constructor(
    private service: WellsService,
    private eventService: EventListService
  ) { }

  ngOnInit(): void {
    this.getEventDetails();

    this.isEvent;

    if (this.isEvent) {
      this.getDefaultValues();
    }
  }

  getDefaultValues() {
    this.eventService.getDefaultEvents().subscribe((response: any) => {
      this.evnts = response.events;
      this.wellNames = response.wellNames;
      this.eventType = response.eventTypes;
    });
  }

  getEventDetails() {
    this.eventService.getWellEvents().subscribe((resp: any) => {
      this.evnts = resp.events;

      this.wellNames = resp.wellNames;
      this.eventType = resp.eventTypes;
    });
  }

  onInputChange(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filteredProviders = this.allProviders.filter((value: any) => {
      const prov = value.toLowerCase();
      return prov.includes(searchInput);
    });
  }

  onInputChangeEvent(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filteredProviders = this.allProviders.filter((value: any) => {
      const prov = value.toLowerCase();
      return prov.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = '';
    this.filteredProviders = this.allProviders;
  }

  onWellSelectionEvents(selectedWellNamesArray: any) {
    this.eventSelectedWells = selectedWellNamesArray;
    this.filtersApplied.wellNames = selectedWellNamesArray.length > 0;
  }

  onWellSelectionEventType(selectedeventType: any) {
    this.eventTypesWell = selectedeventType;
    this.filtersApplied.eventType = selectedeventType.length > 0;
    console.log(this.eventTypesWell);
  }

  clearAppliedFilter() {
    this.clearWellNames();
    this.eventSelectedWells = [];
    this.providers = new FormControl();
    this.wellFormControl = new FormControl();

    this.filterRefresh.emit({
      pageSize: 5,
      pageNumber: 1,
      searchText: '',
      sortColumn: '',
      sortDirection: '',
      searchStatus: '',
    });
  }

  submitAppliedFilters() {
    let payload = {};
    if (this.isEvent) {
      payload = {
        pageSize: 5,
        pageNumber: 1,
        searchText: '',
        sortColumn: '',
        sortDirection: '',
        searchStatus: '',
        dateRange: {
          fromDate: '',
          toDate: '',
        },
        selectedWells: this.eventSelectedWells,
        eventType: this.eventTypesWell,
        ids: [],
      };
    } else {
      payload = {
        pageSize: 5,
        pageNumber: 1,
        searchText: '',
        sortColumn: '',
        sortDirection: '',
        searchStatus: '',
        wellNames: [],
        eventTypes: [],
        Ids: [],
      };
    }
    this.filterRefresh.emit(payload);
  }
  
  clearWellNames() {
    this.selectedWellNames.setValue([]);
    this.filtersApplied.wellNames = false;
    this.filtersApplied.eventType = false;
  }

  formatLabel(value: number): string {
    let percentageValue = Math.round(value * 100) / 100;
    return `${percentageValue}%`;
  }

  formatLabelSPM(value: number): string {
    let percentageValue = Math.round(value * 100) / 100;
    return `${percentageValue}`;
  }
}
