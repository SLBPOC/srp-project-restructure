import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { AlgorithmsAndMitigationsService } from '../../../../shared/services/algorithms-and-mitigations.service';
import { DynacardService } from '../../../../shared/services/dynacard.service';
import { BehaviorSubject, Observable, Subject, Subscription, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CardDetailsModel, ClassficationInfo, DateRangeBubbleChart, DynacardModel2, FramesDynameter } from '../../../../shared/models/dyna-card.model';


// interface Food {
//     value: string;
//     viewValue: string;
//   }
//   export interface PeriodicElement {
//     select: string;
//     card: string;
//     time: string;
//     Minimum_Polished_Rod_Load: string;
//     Peak_Polished_Rod: string;
//   }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
//   { select: '', card: 'Pump Tagging', time: '2020-04-14 13:14:59', Minimum_Polished_Rod_Load: '17,829 lbs', Peak_Polished_Rod:'30,314 lbs' },
// ];
@Component({
  selector: 'app-wellinfo-dynacard',
  templateUrl: './wellinfo-dynacard.component.html',
  styleUrls: ['./wellinfo-dynacard.component.scss'],


})

export class WellinfoDynacardComponent implements OnInit {
  // displayedColumns: string[] = ['select', 'card', 'time', 'Minimum_Polished_Rod_Load','Peak_Polished_Rod'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];

  dynacardSummaryData: { label: string, value: string }[] = [
    { label: 'Puming Status ', value: 'Running' },
    { label: 'Comm Status', value: 'Comm Established' },
    { label: 'Data Quality', value: 'ShutDown' },
    { label: 'Runtime %', value: '30%' },
    { label: 'Inferred Production(bpd)', value: '60' },
    // {label: 'Data Quality', value: 'ShutDown'},


  ];

  classification = [
    "Pump Tagging",
    "Last Storke Card",
    "Distorted",
    "Flatlining",
    "Fluid Pound",
    "Gas Interference",
    "High Fluid Level",
    "Very High Fluid Level",
    "Other"
  ]

  ///////////////////////////////////////////////
  // toppings = this._formBuilder.group({
  //   EffectiveRunTime: false,
  //   CyclesToday: false,
  //   StructuralLoad: false,
  //   MinMaxLoad: false,
  //   GearboxLoad: false,
  //   RodStress: false
  // });
  constructor(private _formBuilder: FormBuilder, private service: AlgorithmsAndMitigationsService, private dynaService: DynacardService) {
    this.dynaService.selectedClassification.subscribe(
      (x) => {
        this.getTableData(x.startDate, x.classfication, x.endDate);
        this.dynaService.selectedTime.next({ addedOrRemoved: false, selected: 'all' });
        this.selectionTimeModel.clear();
        this.searchText = '';
        this.searchTextObseravale.next('');
        // //console.log(this.selectedClassification)
      }
    );

    this.dynaService.selectedTime.subscribe(x => {
      if (x.addedOrRemoved) {
        this.dynaService.getDetailsAboutTime(x.selected).subscribe(y => {
          console.log(y)
          this.selectedTimeDetails = y;
        });
      }
      else {
        this.selectedTimeDetails = new CardDetailsModel();
      }
    });
    this.dynaService.selectedTime.pipe(takeUntil(this.$takUntil), switchMap(obj => {
      //console.log(obj);
      if (obj.addedOrRemoved) {
        return this.dynaService.getDynaCardDetailsForATime(obj.selected)
          .pipe(
            takeUntil(this.$takUntil),
            map(y => ({ dynaDetails: y, name: obj.selected })));
      }
      else {
        return of(({ dynaDetails: undefined, name: obj.selected }));
      }
    })).subscribe((x: any) => {
      //console.log(x);
      if (x.name == 'all')
        this.removeAllSeries();
      else
        this.updateInHighChartv2(x.dynaDetails, x.dynaDetails != undefined, x.name);
    });

    this.dynaService.selectedTimeInGraph.subscribe(x => {
      if (x != undefined && x != '')
        this.dynaService.getDetailsAboutTime(x).subscribe(y => {
          this.selectedTimeDetails = y;
        });
    });
    this.getChartInfo();
  }
  // ngAfterViewInit(): void {

  // }

  // BAR CHART
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: ''
    },
    chart: {
      plotShadow: true,
      renderTo: 'container',
      backgroundColor: undefined
    },

    xAxis: {
      categories: ['Runtime(%) 23-06-20', 'Inferred Production(bpd) 23-06-21'],
      // labels:{
      //   enabled:false
      // }
      labels: {
        style: {
          fontSize: '9px'
        }
      }
    },

    yAxis: {
      // allowDecimals: false,
      // min: 100,
      labels: {
        enabled: false
      },
      title: {
        text: ''
      },
      tickLength: 0,
      gridLineWidth: 0
    },
    legend: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
      // headerFormat: '<b>{point.x}</b><br/>', pointFormat:

      //   '{series.name}:</b> Total: {point.stackTotal}',
    },

    plotOptions: {
      // column: {
      //   stacking: 'normal',
      //   allowPointSelect: true,
      // },
    },

    series: [

      {
        name: "",
        data: [30, 60],
        type: 'column',
        color: '#3097A7',
        pointWidth: 40,
        dataLabels: {
          enabled: true,
          inside: false,
          style: {
            fontSize: '9px'
          }
        }
      },
      // {
      //   name: "",
      //   data: [78, 68],
      //   type: 'column',
      //   color: '#3097A7',
      //   pointWidth: 40
      // },

    ],
  };
  // BAR CHART

  /// top bubble chart and legends

  bubbleSeries = [];
  bubbleChartInfo!: ClassficationInfo[];
  bubbleChartSubscription!: Subscription;
  bubbleChartInfoSubscription!: Subscription;
  activeTimeRange!:string;


  // constructor() { }
  ngOnInit(): void {
    this.bubbleChartTimeSelection('3m');
    
  }

  getTableData(startDate: string, classfication: string, endDate: string) {
    this.listOfTime = this.dynaService.getListOfTime(classfication, startDate, endDate);
  }

  getBubbleChartData(): void {
    this.bubbleChartSubscription = this.service.getBubbleChartDataV2(this.selectedRangeValue.start, this.selectedRangeValue.end).subscribe((data) => {
      this.bubbleChartOptions.series = this.mapToHighchartObject(data.cards);
      this.bubbleChartUpdate = true;
      this.bubbleChartInfo[this.bubbleChartInfo.length -1].value = 0;
      this.bubbleChartInfo.forEach(x=>{
        var updateObj = data.classfication.find(y=> y.name.trim().toLocaleLowerCase() == x.type.trim().toLocaleLowerCase());
        if(updateObj != undefined)
            x.value = updateObj.count;
            // this.bubbleChartInfo[this.bubbleChartInfo.length -1 ].value  += .count;
      });
    })
  }

  mapToHighchartObject(data: DateRangeBubbleChart[]): any {

    const transformedDataMap: Map<string, any> = new Map();

    data.forEach((entry) => {
      entry.classfications.forEach((classification) => {
        if (transformedDataMap.has(classification.name)) {
          const existingEntry = transformedDataMap.get(classification.name);
          var existingDate = (<[]>existingEntry.data).findIndex(x => x[0] == entry.from);
          if (existingDate > -1) {
            existingEntry.data[existingEntry][2] = existingEntry.data[existingEntry][2] + classification.count;
          }
          else
            existingEntry.data.push([entry.from, this.classification.indexOf(classification.name) + 1, classification.count]);
        } else {
          const transformedEntry = {
            name: classification.name,
            marker: this.markerObject(classification.name),
            data: [[entry.from, this.classification.indexOf(classification.name) + 1, classification.count]]
          };
          transformedDataMap.set(classification.name, transformedEntry);
        }
      });
    });

    var result = Array.from(transformedDataMap.values());
    return result;

  }

  markerObject(classfication: string) {
    var marker = {};
    switch (classfication) {
      case "Pump Tagging":
        marker = { symbol: "circle", fillColor: "#57B2C0" };
        break;
      case "Flatlining":
        marker = { symbol: "diamond", fillColor: "#D25299" };
        break;
      case "Gas Interference":
        marker = { symbol: "square", fillColor: "#5433A0" };
        break;
      case "Fluid Pound":
        marker = { symbol: "circle", fillColor: "#EA910D" };
        break;
      case "Distorted":
        marker = { symbol: "square", fillColor: "#FFD200" };
        break;
      case "Normal":
        marker = { symbol: "diamond", fillColor: "#2196F3" };
        break;
      default:
        // Handle unknown classification names
        break;
    }
    return marker;
  }
  getMarkerForClassification(name:string)
  {
    var result = this.bubbleChartInfo.find(x=>x.type == name);
    if (result != undefined)
      return result.symbolClass;
    else 
      return this.bubbleChartInfo[this.bubbleChartInfo.length - 1].symbolClass;
  }

  getChartInfo() {
    this.bubbleChartInfoSubscription = this.service.getChartInfo().subscribe((data) => {
      this.bubbleChartInfo = data;
    })
  }

  onPointClick = (p: any) => {
    this.dynaService.selectedClassification.next(
      { classfication: p.point.series.name, startDate: p.point.options.name, endDate: p.point.options.name }
    );
    // //console.log(p.point.options.z)
  }

  onShowEvent = (p: any) => {
    //console.log(p);
  }

  bubbleChartUpdate: boolean = false;
  bubbleChartOptions: Highcharts.Options = {
    chart: {
      type: 'bubble',
      // plotBorderWidth: 1,
      spacing: [0, 0, 0, 0],
      zooming: {
        type: 'x'
      },
      backgroundColor: undefined
    },
    // colorAxis: [{}, {
    //   minColor: '#434348',
    //   maxColor: '#e6ebf5'
    // }],
    title: {
      text: ''
    },
    xAxis: {
      gridLineWidth: 0,
      type: 'category'
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      visible: false,
      // gridLineWidth: 1
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value}'
    },
    plotOptions: {
      bubble: {
        minSize: '10%',
        maxSize: '12%',
        marker: {
          fillOpacity: 1,
        },
        // zMin: 0,
        // zMax: 1000,
        // layoutAlgorithm: {
        //   splitSeries: false,
        //   gravitationalConstant: 0.02
        // },
        dataLabels: {
          enabled: true,
          format: `<b style="color:black">{point.z}</b>`,
          inside: true,
          style: {
            textOutline: 'none'
          }
        },
        point: {
          events: {
            click: this.onPointClick
          }
        },
        events: {
          afterAnimate: this.onShowEvent,
          show: this.onShowEvent
        },
        cursor: 'pointer',
        states: {
          hover: {
            enabled: false
          }
          , inactive: {
            enabled: false
          }
        }
      }
    },
    series: this.bubbleSeries
  };

  // drawChart() {
  //   // // this.bubbleChartOptions.series.push(this.bubbleSeries);
  //   //console.log(this.bubbleSeries);

  // }

  selectedRangeValue!: DateRange<Date>;

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
  }


  bubbleChartTimeSelection(type: string) {
    this.activeTimeRange = type;
    if (type == '3m') {
      const endDate = new Date(); // Today's date
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 59);
      this.selectedRangeValue = new DateRange<Date>(startDate, endDate);
      this.getBubbleChartData();
    }
    else if (type == 'cal') {
      this.getBubbleChartData();
    };
    this.dynaService.selectedClassification.next(
      { classfication: 'all', startDate: this.selectedRangeValue.start?.toISOString(), endDate: this.selectedRangeValue.end?.toISOString() }
    );
  }

  //top bubble chart and legends


  /// right time series table
  displayedColumns: string[] = ['#', 'card', 'time', 'minimunpolishedrodload', 'peakpolishedrod'];
  listOfTime!: Observable<any>;
  // selectedClassification = new BehaviorSubject<number>(-1);
  selectionTimeModel = new SelectionModel<string>(true);
  searchText!: string;
  searchTextObseravale = new BehaviorSubject<string>("");

  tableLoading = false;

  searchTime() {
    this.searchTextObseravale.next(this.searchText);
  }

  randomInteger(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  selectTime(item: string) {
    this.selectionTimeModel.toggle(item);
    this.dynaService.selectedTime.next({
      addedOrRemoved: this.selectionTimeModel.isSelected(item),
      selected: item
    })
  }

  /// right time series table

  ///dynacard graph

  $takUntil = new Subject<boolean>();

  ngOnDestroy(): void {
    this.$takUntil.next(true);
    this.$takUntil.complete();
  }
  onDynaPointClick = (p: any) => {
    // //console.log(p.point.series.name);
    this.dynaService.selectedTimeInGraph.next(p.point.series.name);
    // //console.log(p.point.options.z)
  }



  // csvFile: any;
  // private csvText: string = "";
  // allData: DynaCardModel[] | null = null;
  Index: number = 0;

  updateDynaHighChartFlag: boolean = false;
  dynaOptions: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      backgroundColor: undefined
    },
    legend: {

    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Load'
      }
    },
    xAxis: {
      title: {
        text: 'Position'
      },
      type: 'category',
      tickInterval: 10
    },
    plotOptions: {
      series: {
        events: {
          click: this.onDynaPointClick
        },
        point: {
          events: {
            click: this.onDynaPointClick
          }
        }
      }
    },
    series: []
  };

  // updateChart(event: any) {
  //   this.updateCsvData(event);
  // }

  removeAllSeries() {
    this.dynaOptions.series?.splice(0, this.dynaOptions.series.length);
    this.updateDynaHighChartFlag = true;
  }

  updateInHighChartv2(dynacard: DynacardModel2[], addedOrRemoved: boolean, name: string) {
    //console.log(dynacard, addedOrRemoved);
    // return;
    if (addedOrRemoved) {
      var downhole = dynacard.map(x => [x.downhole_Card_Position, x.downhole_Card_Load]);
      var surface = dynacard.map(x => [x.surface_Card_Position, x.surface_Card_Load]);
      this.dynaOptions.series?.push({
        id: name + '-downhole',
        type: 'line',
        data: downhole,
        colorIndex: this.Index,
        name: name
      });
      this.dynaOptions.series?.push({
        id: name + '-surface',
        type: 'line',
        data: surface,
        colorIndex: this.Index,
        linkedTo: ':previous',
        name: name
      });
      this.Index++;
    }
    else {
      this.dynaOptions.series?.filter(
        x => x.id == name + '-downhole' || x.id == name + '-surface'
      ).forEach(
        x => {
          var id = this.dynaOptions.series?.findIndex(y => y.id == x.id);
          if(id)
          this.dynaOptions.series?.splice(id, 1);
        });
    }
    this.updateDynaHighChartFlag = true;
  }

  ///dynacard graph

  ///Seleed Time series

  selectedTimeDetails: CardDetailsModel = new CardDetailsModel();;

  mappingOfFields = {
    pumpFillage_per: 'Pump Fillage(%) ',
    SPM: 'SPM',
    minPolishedRodLoad_lbs: 'Min.Polished Rod Load(lbs)',
    peakPolishedRodLoad_lbs: 'Peak Polished Rod Load(lbs)',
    surfaceStrokeLength_in: 'Surface Stroke Length (in)',
    downholeStrokeLength_in: 'Downhole Stroke Length (in)',
    totalFluid_in: 'Total Fluid (in)',
  };

  classficationListdata: { value: any, viewValue: any }[] = [
    { value: 1, viewValue: 'Pump Tagging' },
    { value: 2, viewValue: 'Last Storke Card' },
    { value: 3, viewValue: 'Distorted' },
    { value: 4, viewValue: 'Flatlining' },
    { value: 5, viewValue: 'Fluid Pound' },
    { value: 6, viewValue: 'Gas Interference' },
    { value: 7, viewValue: 'High Fluid Level' },
    { value: 8, viewValue: 'Very High Fluid Level' },
    { value: 9, viewValue: 'Other' },
  ];
  ///selected Time Series
}
