import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
//import { WellName } from '../model/wellname';
import { WellModel } from '../../../shared/models/wellModel'
import { WellsService } from '../../../shared/services/wells.service';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { fromEvent, map, debounceTime, distinctUntilChanged, tap } from 'rxjs'
import * as HighCharts from 'highcharts';
import { Router } from '@angular/router';
import { TreeViewService } from '../../../shared/services/tree-view.service';
import { NodeType } from '../../../shared/services/models';
import { Constants } from 'src/app/Common/Constants';


@Component({
  selector: 'app-wells',
  templateUrl: './wells.component.html',
  styleUrls: ['./wells.component.scss']
})
export class WellsComponent implements OnInit {
  theme = 'light';
  dataSource: any = [];
  WellList!: WellModel[];
  selectedColumn: string[] = [];
  displayedColumns: string[] = ['WellStatus', 'WellName', 'DateAndTime', 'CommStatus', 'ControllerStatus', 'SPM.value', 'PumpFillage.value', 'InferredProduction.value', 'NoOfAlerts'];
  displayableExtraColumns: { label: string, accessor: string, header: string }[] = [];
  extraColumnsCtrl: any = new FormControl('');
  extraColumnsList: { label: string, accessor: string, header: string }[] = [
    { label: 'Effective Runtime(%)', accessor: 'effectiveRunTime', header: 'EffectiveRunTime.value' },
    { label: 'Cycles Today', accessor: 'cyclesToday', header: 'CyclesToday.value' },
    { label: 'Structural Load(%)', accessor: 'structuralLoad', header: 'StructuralLoad.value' },
    { label: 'MinMax Load(%)', accessor: 'minMaxLoad', header: 'MinMaxLoad.value' },
    { label: 'Gearbox Load(%)', accessor: 'gearboxLoad', header: 'GearboxLoad.value' },
    { label: 'Rod Stress(%)', accessor: 'rodStress', header: 'RodStress.value' }
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('extraColumns', { static: true }) private extraColumns!: MatSelect;

  @ViewChild('searchQueryInput') searchInput!: ElementRef<HTMLInputElement>;

  HighCharts: typeof HighCharts = HighCharts;

  searchText: string = "";
  sortDirection: string = "";
  sortColumn: string = "";
  pageSize: number = 5;
  pageNumber = 1;
  currentPage = 0;
  totalCount = 0;
  model: any = {};
  seachByStatus: string = "";
  loading = true;

  //filter variables;
  commStatus!: any[];
  controllerStatus!: any[];
  inferredProduction!: any[];
  pumpFillage!: any[];
  pumpingType!: any[];
  spm!: any[];
  wellNames!: any[];


  //legend variables
  TotalCount: number = 0;
  OverPumping: number = 0;
  OptimalPumping: number = 0;
  UnderPumping: number = 0;

  minmaxChartData: any[] = [];  //min max chart data array
  pageSizeOption = [10, 20, 30]
  ids!: number[];
  respdata: any


  constructor(private _liveAnnouncer: LiveAnnouncer, private service: WellsService, private router: Router, public treeviewService: TreeViewService) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap(x => this.searchText = x)
    ).subscribe(x => {
      if (x != undefined && x.trim() != "") {
        this.GetWellDetailsWithFilters();
      }
    });
  }

  ngOnInit(): void {
    this.GetWellDetailsWithFilters();
    this.treeviewService.selectedNodes.subscribe(x => {
      console.log(x);
      if (x != undefined && x.length > 0 && x.some(m => m.Type == NodeType.Wells)) {
        this.ids = x.filter(m => m.Type == NodeType.Wells).map(m => m.NodeId);
      }
      else
        this.ids = [];
      this.GetWellDetailsWithFilters();
    })
  }



  GetWellDetailsWithFilters() {
    this.loading = true;
    var SearchModel = this.createModel();
    this.service.getWellDetailsWithFilters(SearchModel).subscribe((response: any) => {
      if (response.hasOwnProperty('data')) {
        this.loading = false;
        this.pageSizeOption = [10, 15, 20, response.totalCount]
        // this.getPageSizeOptions();
        this.WellList = response.data;
        this.WellList.forEach(x => this.prepareChart(x));
        this.dataSource = new MatTableDataSource<WellModel>(this.WellList);
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.totalCount;
        });

        this.TotalCount = response.totalCount;
        this.OverPumping = response.totalOverpumping;
        this.OptimalPumping = response.totalOptimalPumping;
        this.UnderPumping = response.totalUnderpumping;
        this.dataSource.paginator = this.paginator;

      }

    });
  }


  refreshGrid(payload: any) {
    this.seachByStatus=""; // Added by Gayatri 9/8/2023
    this.commStatus = payload.commStatus;
    this.controllerStatus = payload.controllerStatus;
    this.inferredProduction = payload.inferredProduction;
    this.pumpFillage = payload.pumpFillage;
    this.pumpingType = payload.pumpingType;
    this.spm = payload.spm;
    this.wellNames = payload.wellNames;
    this.currentPage=0;
    this.GetWellDetailsWithFilters();
  }

  //Create Model for search
  createModel(this: any) {
    this.model.pageSize = this.pageSize;
    this.model.pageNumber = this.pageNumber;
    this.model.searchText = this.searchText ? this.searchText : "";
    this.model.sortColumn = this.sortColumn ? this.sortColumn : "";
    this.model.sortDirection = this.sortDirection ? this.sortDirection : "";
    this.model.searchStatus = this.seachByStatus ? this.seachByStatus : "";
    this.model.ids = this.ids;

    this.model.commStatus = this.commStatus ? this.commStatus : [];
    this.model.controllerStatus = this.controllerStatus ? this.controllerStatus : [];
    this.model.inferredProduction = this.inferredProduction ? this.inferredProduction : { start: 0, end: 100 };
    this.model.pumpFillage = this.pumpFillage ? this.pumpFillage : { start: 0, end: 100 };
    this.model.pumpingType = this.pumpingType ? this.pumpingType : [];
    this.model.spm = this.spm ? this.spm : { start: 0, end: 100 };
    this.model.wellNames = this.wellNames ? this.wellNames : [];

    return this.model;
  }

  search(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;

  }

  ClearSearch() {
    this.pageNumber = 1;
    this.seachByStatus = "";
    this.searchText = "";
    this.ids = [];
    this.currentPage=0;
    this.GetWellDetailsWithFilters();
  }

  RefreshGrid()
  {
    this.seachByStatus=""; // Added by Gayatri 9/8/2023
    //this.pageSize = 5;
    this.pageNumber=1;
    this.seachByStatus = "";
    this.sortColumn = "";
    this.sortDirection = "";
    this.seachByStatus="";
    this.currentPage=0;

    this.GetWellDetailsWithFilters();
  }

  // RefreshGrid() {
  //       const payload = {
  //         "pageSize": 5,
  //         "pageNumber": 1,
  //         "searchText": "",
  //         "sortColumn": "",
  //         "sortDirection": "",
  //         "searchStatus": ""
  //     }
    
  //       this.service.getWellDetailsWithFilters(payload).subscribe((response: any) => {
  //         if (response.hasOwnProperty('data')) {
  //           this.loading = false;
  //           this.pageSizeOption = [10, 15, 20, response.totalCount]
  //           // this.getPageSizeOptions();
  //           this.WellList = response.data;
  //           this.WellList.forEach(x => this.prepareChart(x));
  //           this.dataSource = new MatTableDataSource<WellModel>(this.WellList);
  //           setTimeout(() => {
  //             this.paginator.pageIndex = this.currentPage;
  //             this.paginator.length = response.totalCount;
  //           });
    
  //           this.TotalCount = response.totalCount;
  //           this.OverPumping = response.totalOverpumping;
  //           this.OptimalPumping = response.totalOptimalPumping;
  //           this.UnderPumping = response.totalUnderpumping;
  //           this.dataSource.paginator = this.paginator;
    
  //         }
  //       })
  //     }

  onChangeDemo(event: any) {
    if (event.checked) {
      if (this.selectedColumn.filter(resp => event.source.value === resp)) {
        this.selectedColumn.push(event.source.value)
        this.displayedColumns = [...this.displayedColumns.filter((column: string) => !this.extraColumnsList.find(({ header }) => header === column)), ...[...new Set(this.selectedColumn)]];
        this.displayableExtraColumns = this.extraColumnsList.filter((extraColumn: { label: string, accessor: string, header: string }) => [...new Set(this.selectedColumn)].includes(extraColumn.header));
      }
    } else {
      this.selectedColumn = this.selectedColumn.filter(function (e) { return e !== event.source.value })
      this.displayedColumns = [...this.displayedColumns.filter((column: string) => !this.extraColumnsList.find(({ header }) => header === column)), ...this.selectedColumn];
      this.displayableExtraColumns = this.extraColumnsList.filter((extraColumn: { label: string, accessor: string, header: string }) => this.selectedColumn.includes(extraColumn.header));
    }
  }



  public handlePage(e: any) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.sortDirection = this.sort.direction;
    this.sortColumn = (typeof this.sort.active !== "undefined") ? this.sort.active : "";
    this.GetWellDetailsWithFilters();
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageNumber = event.pageIndex + 1;
    this.GetWellDetailsWithFilters();
  }

  public onSortChanged(e: any) {
    this.pageNumber = this.pageNumber;
    this.pageSize = this.pageSize;
    this.sortDirection = this.sort.direction;
    this.sortColumn = (typeof this.sort.active !== "undefined") ? this.sort.active : "";
    this.GetWellDetailsWithFilters();
  }

  SeachByStatus(status: string) {
    this.seachByStatus = status;
    this.pageNumber = 1;
    this.GetWellDetailsWithFilters();
  }

  GetMinMaxChartData(w: WellModel) {
    this.minmaxChartData = [];
    this.minmaxChartData.push({ name: "min", data: w.minMaxLoad.min });
    this.minmaxChartData.push({ name: "min", data: w.minMaxLoad.max });
    return this.minmaxChartData;
  }

  // GetRandomNumbers(isNegative: boolean = true) {
  //   var integers = [];
  //   for (let index = 0; index < 7; index++) {
  //     integers.push([index + 1, (Math.random() * (isNegative ? 21 : 10)) - (isNegative ? 10 : 0)])
  //   }
  //   return integers;
  // }

  // GetMinMaxRandomNumbers(isNegative: boolean = true) {   
  //   this.minmaxChartData=[];
  //   this.minmaxChartData.push({name:"min",data:this.GetRandomNumbers(false)});
  //   this.minmaxChartData.push({name:"max",data:this.GetRandomNumbers(false)});
  //   return this.minmaxChartData; 
  // }

  prepareChart(x: WellModel): void {

    this.bindInferredChart(x);
    this.bindSPMChart(x);
    this.bindPumpFillageChart(x);
    this.bindEffectiveRunChart(x);
    this.bindCycleChart(x);
    this.bindStructuralLoadChart(x);
    this.bindMinMaxLoadChart(x);
    this.bindGearBoxLoadChart(x);
    this.bindRodStressChart(x);
  }


  bindSPMChart(x: WellModel) {
    x.spmChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.spm.data   //this.GetRandomNumbers(false)
      }],
      ...Constants.highChartCommonContext
    }
  }

  bindPumpFillageChart(x: WellModel) {
    x.pumpFillageChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.pumpFillage.data
      }],
      ...Constants.highChartCommonContext
    }
  }

  bindInferredChart(x: WellModel) {
    var charobj: HighCharts.Options = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        type: 'line',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.inferredProduction.data
      }],
      ...Constants.highChartCommonContext
    }
    x.inferredChartObj = charobj;
  }

  bindEffectiveRunChart(x: WellModel) {
    x.effectiveRunChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.effectiveRunTime.data //this.GetChartData(x).effectiveRuntime.data
      }],
      ...Constants.highChartCommonContext
    }

  }

  bindCycleChart(x: WellModel) {
    x.cycleChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'column',
        data: x.cyclesToday.data
      }],
      ...Constants.highChartCommonContext
    }
  }

  bindStructuralLoadChart(x: WellModel) {
    x.structuralLoadChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.structuralLoad.data
      }],
      ...Constants.highChartCommonContext
    }
  }

  bindMinMaxLoadChart(x: WellModel) {

    x.minMaxLoadChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        type: 'line',
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },

      series: this.GetMinMaxChartData(x),
      ...Constants.highChartCommonContext
    }
  }

  bindGearBoxLoadChart(x: WellModel) {
    x.gearBoxLoadChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.gearboxLoad.data
      }],
      ...Constants.highChartCommonContext
    }
  }

  bindRodStressChart(x: WellModel) {
    x.roadStressChartObj = {
      title: { text: '' },
      chart: {
        renderTo: 'container',
        margin: 0,
        spacing: [0, 0, 0, 0],
        backgroundColor: undefined
      },
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible:false

      },
      legend: {
        enabled: false
      },
      tooltip: {
        outside: false,
        className: 'highchart-elevate-tooltip'
      },
      series: [{
        type: 'line',
        data: x.rodStress.data
      }],
      ...Constants.highChartCommonContext
    }
  }

  navigateToWellInfo(wellId: string) {
    //this.router.navigateByUrl(`/well-info-v2/${wellId}`)
    this.router.navigate([]).then(result => { window.open(`/well-info-v2/${wellId}`, '_blank'); });  // in new tab
  }


  searchObjC: any;
  userSearchChange(obj: any) {
    this.searchObjC = obj;
  }

}
