import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { BehaviorSubject, Observable, Subject, Subscription, from, map, of, switchMap, takeUntil, tap } from 'rxjs';
import {concatMap} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { CardDetailsModel, ClassficationInfo, Classification, DateRangeBubbleChart, DynacardModel2, FramesDynameter } from '../../../../shared/models/dyna-card.model';
import { AlgorithmsAndMitigationsService } from 'src/app/shared/services/algorithms-and-mitigations.service';
import { DynacardService } from 'src/app/shared/services/dynacard.service';

interface IClassificationStack {
  classfication: string, 
  startDate: string, 
  endDate: string 
}

@Component({
  selector: 'app-ui-dynacard-info',
  templateUrl: './ui-dynacard-info.component.html',
  styleUrls: ['./ui-dynacard-info.component.scss']
})
export class UiDynacardInfoComponent {
  oncheckboxClick: boolean = false;
  cardInfoTableColumns = ['stickyRow']

  classification = [
    "Pump Tagging",
    "Normal",
    // "Last Storke Card",
    "Distorted",
    "Flatlining",
    "Fluid Pound",
    "Gas Interference",
    // "High Fluid Level",
    // "Very High Fluid Level",
    // "Other"
  ]

  dynamicRowsForSelectedStagedTimeFrames = [
    "pumpFillage_per",
    "SPM",
    "minPolishedRodLoad_lbs",
    "peakPolishedRodLoad_lbs",
    "surfaceStrokeLength_in",
    "downholeStrokeLength_in",
    "totalFluid_in"
  ]

  pinnedFrames: Date[] = [];

  pinnedFrameKey = "pinned-frame-key";

  pinnedFramesDetails = new Map<Date, CardDetailsModel>();

  selectedDynamicRowsForSelectedStagedTimeFrames = Array.from(Array(this.dynamicRowsForSelectedStagedTimeFrames.length).keys());


  pinnedFrameTableColumns: string[] = ['index', '#', 'time', 'cardName', 'primary', 'secondary', "notes", 'SPM', 'PF', 'unpinicon'];


  constructor(private _formBuilder: FormBuilder, private service: AlgorithmsAndMitigationsService, private dynaService: DynacardService) {
    this.dynaService.selectedClassification.subscribe(
      (x: any) => {
        this.getTableData(x.startDate, x.classfication, x.endDate);
        // this.dynaService.selectedTime.next({ addedOrRemoved: false, selected: 'all' });
        // this.selectionTimeModel.clear();
        this.searchText = '';
        this.searchTextObseravale.next('');
        // //console.log(this.selectedClassification)
      }
    );

    this.updatePinnedFrames();

    // this.dynaService.selectedTime.subscribe(x => {
    //   if (x.addedOrRemoved) {
    //     this.dynaService.getDetailsAboutTime(x.selected).subscribe(y => {
    //       // console.log(y, x.selected);
    //       this.cardInfoTableColumns.push(x.selected);
    //       //console.log(this.cardInfoTableColumns);
    //       this.selectedTimeDetails.set(x.selected, y);
    //     });
    //   }
    //   else {
    //     this.cardInfoTableColumns.splice(this.dynamicRowsForSelectedStagedTimeFrames.findIndex(t => t == x.selected), 1);
    //     this.selectedTimeDetails.delete(x.selected);
    //   }
    // });
    this.dynaService.selectedTime.pipe(takeUntil(this.$takUntil), switchMap(obj => {
      //console.log(obj);
      if (obj.addedOrRemoved) {
        return this.dynaService.getDynaCardDetailsForATime(obj.selected.frame)
          .pipe(
            takeUntil(this.$takUntil),
            map(y => ({ dynaDetails: y, seriesObj: obj.selected })));
      }
      else {
        return of(({ dynaDetails: undefined, seriesObj: obj.selected }));
      }
    })).subscribe((x: any) => {
      //console.log(x);
      // if (x.name.frame == 'all')
      //   this.removeAllSeries();
      // else
      this.updateInHighChartv2(x.dynaDetails, x.dynaDetails != undefined, x.seriesObj);
    });

    // this.dynaService.selectedTimeInGraph.subscribe(x => {
    //   if (x != undefined && x != '')
    //     this.dynaService.getDetailsAboutTime(x).subscribe(y => {
    //       this.selectedTimeDetails = y;
    //     });
    // });
    // this.getChartInfo();


  }
  updatePinnedFrames() {
    var framesString = localStorage.getItem(this.pinnedFrameKey);
    if (framesString != undefined && framesString != null) {
      this.pinnedFrames = JSON.parse(framesString);
      this.updatePinnedFrameDetails();
    }
  }

  updatePinnedFrameDetails(id: Date = new Date()) {
    // if (id != null) {
    this.dynaService
      .getListOfTime("all", '2023-01-01', (new Date()).toISOString())
      .pipe(takeUntil(this.$takUntil))
      .subscribe(y => y.filter(x => id == null ? this.pinnedFrames.findIndex((z: any) => z == x.frame) > -1 : id == x.frame).forEach(x => this.pinnedFramesDetails.set(x.frame, x)));
    // }
    // else
    // this.dynaService.getListOfTime("all",id.toISOString()).pipe(takeUntil(this.$takUntil)).subscribe(y => this.pinnedFramesDetails.set(id, y));
  }

  pinTheFramePlease(frame: CardDetailsModel) {
    if (this.pinnedFramesDetails.has(frame.frame))
      return;
    this.pinnedFrames.push(frame.frame);
    this.pinnedFramesDetails.set(frame.frame, frame);
    localStorage.removeItem(this.pinnedFrameKey);
    localStorage.setItem(this.pinnedFrameKey, JSON.stringify(this.pinnedFrames));
  }

  unPinTheFramePlease(frame: any) {
    this.pinnedFrames.splice(this.pinnedFrames.findIndex(x => x == frame.frame), 1);
    this.pinnedFramesDetails.delete(frame.frame);
    localStorage.removeItem(this.pinnedFrameKey);
    localStorage.setItem(this.pinnedFrameKey, JSON.stringify(this.pinnedFrames));
  }

  // ngAfterViewInit(): void {

  // }

  reclassifiy(element: any, event: any) {
    element.classfication = event.value;
    this.dynaOptions?.series?.forEach((x: any) => {
      if (x.name.indexOf(element.frame) > -1) {
        x.color = this.markerSvg(element.classfication).color;
      }
    })
    this.updateDynaHighChartFlag = true;
  }

  dynaMeterQuickGetData(seriesObj: any) {
    this.dynaService.getDynaCardDetailsForATime(seriesObj.frame).pipe(takeUntil(this.$takUntil)).subscribe(x => {
      this.updateInDynaQuckView(x, seriesObj);
    });
  }


  /// top bubble chart and legends

  bubbleSeries = [];
  bubbleClassficationInfo!: Classification[];
  bubbleChartSubscription!: Subscription;
  bubbleChartInfoSubscription!: Subscription;
  activeTimeRange!: string;
  stagedTimeFrames = new Map<string, CardDetailsModel>();

  Highcharts: typeof Highcharts = Highcharts;



  // constructor() { }
  ngOnInit(): void {
    this.bubbleChartTimeSelection('3m');

  }

  getFrameObj(frame: any) {
    // console.log(frame);
    return this.stagedTimeFrames.get(frame);
  }

  getTableData(startDate: string, classfication: string, endDate: string) {
    this.listOfTime = this.dynaService.getListOfTime(classfication, startDate, endDate);
  }

  onClassficationLegendClick(classfication: string) {
    this.dynaService.selectedClassification.next({ classfication: classfication, startDate: this.selectedRangeValue?.start?.toISOString(), endDate: this.selectedRangeValue?.end?.toISOString() })
  }

  getBubbleChartData(): void {
    this.bubbleChartSubscription = this.service.getBubbleChartDataV2(this.selectedRangeValue.start, this.selectedRangeValue.end).subscribe((data) => {
      this.bubbleChartOptions.series = this.mapToHighchartObject(data.cards);
      this.bubbleChartUpdate = true;
      this.bubbleClassficationInfo = data.classfication;
      this.classification.filter(x => !data.classfication.some(y => y.name == x)).forEach(x => this.bubbleClassficationInfo.push({ name: x, count: 0 }))
      // this.bubbleClassficationInfo.forEach(x => {
      //   var updateObj = data.classfication.find(y => y.name.trim().toLocaleLowerCase() == x.type.trim().toLocaleLowerCase());
      //   if (updateObj != undefined)
      //     x.value = updateObj.count;
      //   // this.bubbleChartInfo[this.bubbleChartInfo.length -1 ].value  += .count;
      // });
    })
  }

  mapToHighchartObject(data: DateRangeBubbleChart[]): any {

    const transformedDataMap: Map<string, any> = new Map();

    data.forEach((entry) => {
      entry.classfications.forEach((classification: any) => {
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
    //console.log(result);
    return result;

  }

  markerObject(classfication: string) {
    var marker = {
      symbol: `url(${this.markerSvg(classfication).marker})`
    };
    // switch (classfication) {
    //   case "Pump Tagging":
    //     marker = { symbol: "circle", fillColor: "#57B2C0" };
    //     break;
    //   case "Flatlining":
    //     marker = { symbol: "diamond", fillColor: "#D25299" };
    //     break;
    //   case "Gas Interference":
    //     marker = { symbol: "square", fillColor: "#5433A0" };
    //     break;
    //   case "Fluid Pound":
    //     marker = { symbol: "circle", fillColor: "#EA910D" };
    //     break;
    //   case "Distorted":
    //     marker = { symbol: "square", fillColor: "#FFD200" };
    //     break;
    //   case "Normal":
    //     marker = { symbol: "diamond", fillColor: "#2196F3" };
    //     break;
    //   default:
    //     // Handle unknown classification names
    //     break;
    // }
    return marker;
  }


  markerSvg(classfication: string): { marker: any, color: any } {
    let marker = "../assets/images/Circle.svg";
    let color = "#2196F3";
    switch (classfication) {
      case "Pump Tagging":
        color = "#2196F3";
        marker = "../assets/images/Circle.svg";
        break;
      case "Flatlining":
        marker = "../assets/images/Diamond.svg";
        color = "#FF5722";
        break;
      case "Gas Interference":
        marker = "../assets/images/Bar.svg";
        color = "#28A228";
        break;
      case "Fluid Pound":
        marker = "../assets/images/Pentagon.svg";
        color = "#F06292";
        break;
      case "Distorted":
        marker = "../assets/images/Octagon.svg";
        color = "#C248F0";
        break;
      case "Normal":
        marker = "../assets/images/Rectangle.svg";
        color = "#0A7D8F";
        break;
      default:
        // Handle unknown classification names
        break;
    }
    return { marker, color };
  }

  // getMarkerForClassification(name: string) {
  //   var result = this.bubbleClassficationInfo.find(x => x.type == name);
  //   if (result != undefined)
  //     return result.symbolClass;
  //   else
  //     return this.bubbleClassficationInfo[this.bubbleClassficationInfo.length - 1].symbolClass;
  // }

  // getChartInfo() {
  //   this.bubbleChartInfoSubscription = this.service.getChartInfo().subscribe((data) => {
  //     this.bubbleChartInfo = data;
  //   })
  // }
  classificationStack: IClassificationStack[] = [];
  classificationStackList: BehaviorSubject<any> = new BehaviorSubject([]);
  
  updateClassificationStack(p: any) {
    this.classificationStackList.next([]);
    const newClassification = {
      classfication: p.point.series.name,
      startDate: p.point.options.name,
      endDate: p.point.options.name
    }
    const index = this.classificationStack.findIndex((e: IClassificationStack) => (e.classfication === p.point.series.name && e.startDate === p.point.options.name))
    if (index < 0) {
      this.classificationStack.push(newClassification);
    } else {
      this.classificationStack.splice(index, 1);
    }
    
    from(this.classificationStack)
    .pipe(
      concatMap((e: IClassificationStack) => this.dynaService.getListOfTimeClassificationStack(e.classfication, e.startDate, e.endDate))
    )
    .subscribe((data: any) => {
      this.classificationStackList.next([...this.classificationStackList.getValue(), data[0]])
    })
  }

  onPointClick = (p: any) => {
    this.dynaService.selectedClassification.next(
      { classfication: p.point.series.name, startDate: p.point.options.name, endDate: p.point.options.name }
    );
    console.log('==> bubble click', p.point.options.z)
    this.updateClassificationStack(p);
  }

  onShowEvent = (p: any) => {
    //console.log(p);
  }

  bubbleChartUpdate: boolean = false;


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
    // if (type == '3m') {
    //   const endDate = new Date(); // Today's date
    //   const startDate = new Date(endDate);
    //   startDate.setDate(endDate.getDate() - 59);
    //   this.selectedRangeValue = new DateRange<Date>(startDate, endDate);
    //   this.getBubbleChartData();
    // }
    // else if (type == 'cal') {
    //   this.getBubbleChartData();
    // };
    const endDate = new Date();
    const startDate = new Date(2023, 2, 1);
    this.selectedRangeValue = new DateRange<Date>(startDate, endDate);
    this.getBubbleChartData();
    this.dynaService.selectedClassification.next(
      { classfication: 'all', startDate: this.selectedRangeValue?.start?.toISOString(), endDate: this.selectedRangeValue?.end?.toISOString() }
    );
  }


  displayedColumnsOld: string[] = ['index', '#', 'card', 'time', 'SPM', 'PF%'];

  stagedTableColumns: string[] = ['index', '#', 'pin', 'time', 'primary_classification', 'secondary_classification', 'SPM', 'PF%'];

  listOfTime!: Observable<CardDetailsModel[]>;
  // selectedClassification = new BehaviorSubject<number>(-1);
  selectionTimeModel = new SelectionModel<string>(true);
  selectionTimeStagedModel = new SelectionModel<string>(true);
  searchText!: string;
  searchTextObseravale = new BehaviorSubject<string>("");

  tableLoading = false;

  JSON = JSON;

  log = (x: any) => console.log(x);

  searchTime() {
    this.searchTextObseravale.next(this.searchText);
  }

  selectTime(item: any) {
    this.selectionTimeModel.toggle(item.frame);
    this.dynaService.selectedTime.next({
      addedOrRemoved: this.selectionTimeModel.isSelected(item.frame),
      selected: item
    })
  }

  selectTimeForStaging(timeFrame: any) {
    this.selectionTimeStagedModel.toggle(timeFrame.frame);
    if (this.selectionTimeStagedModel.isSelected(timeFrame.frame)) {
      this.stagedTimeFrames.set(timeFrame.frame, timeFrame);
      this.dynaService.getDetailsAboutTime(timeFrame.frame).subscribe(y => {
        // console.log(y, x.selected);
        this.cardInfoTableColumns.push(timeFrame.frame);
        //console.log(this.cardInfoTableColumns);
        this.selectedTimeDetails.set(timeFrame.frame, y);
      });
    }
    else {
      this.selectionTimeModel.deselect(timeFrame.frame);
      this.stagedTimeFrames.delete(timeFrame.frame);
      this.updateInHighChartv2([], false, timeFrame.frame);
      this.selectedTimeDetails.delete(timeFrame.frame);
      this.cardInfoTableColumns.splice(this.cardInfoTableColumns.findIndex(x => x == timeFrame.frame), 1);
    }
    this.oncheckboxClick = !this.selectionTimeStagedModel.isEmpty();
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
  // Index: number = 0;

  updateDynaHighChartFlag: boolean = false;
  updateDynaQuickViewHighChartFlag: boolean = false;

  selectedTimeDetails = new Map<string, CardDetailsModel>();


  // updateChart(event: any) {
  //   this.updateCsvData(event);
  // }

  removeAllSeries() {
    this.dynaOptions?.series?.splice(0, this.dynaOptions.series.length);
    this.updateDynaHighChartFlag = true;
  }

  updateInDynaQuckView(dynacard: DynacardModel2[], seriesObj: any) {
    var downhole = dynacard.map(x => [x.downhole_Card_Position, x.downhole_Card_Load]);
    var surface = dynacard.map(x => [x.surface_Card_Position, x.surface_Card_Load]);
    var index = this.dynaQuickViewOptions?.series?.length;
    if(index && this.dynaQuickViewOptions?.series)
    if (index >= 0 && this.dynaQuickViewOptions.series.findIndex((x: any) => x.name.indexOf(seriesObj.frame) > -1) > -1)
      return;
      if(index && this.dynaQuickViewOptions?.series)
    if (index >= 0) {
      this.dynaQuickViewOptions.series.splice(0, this.dynaQuickViewOptions.series.length);
    }
    this.dynaQuickViewOptions?.series?.push({
      id: seriesObj.frame + '-downhole',
      type: 'line',
      data: downhole,
      color: this.markerSvg(seriesObj.classfication).color,
      // colorIndex: index,
      name: seriesObj.frame
    });
    this.dynaQuickViewOptions.series?.push({
      id: seriesObj.frame + '-surface',
      type: 'line',
      data: surface,
      // colorIndex: index,
      color: this.markerSvg(seriesObj.classfication).color,
      linkedTo: ':previous',
      name: seriesObj.frame
    });
    this.updateDynaQuickViewHighChartFlag = true;
  }

  updateInHighChartv2(dynacard: DynacardModel2[], addedOrRemoved: boolean, seriesObj: any) {
    //console.log(dynacard, addedOrRemoved);
    // return;
    if (addedOrRemoved) {
      var downhole = dynacard.map(x => [x.downhole_Card_Position, x.downhole_Card_Load]);
      var surface = dynacard.map(x => [x.surface_Card_Position, x.surface_Card_Load]);
      var index = this.dynaOptions?.series?.length;
      this.dynaOptions?.series?.push({
        id: seriesObj.frame + '-downhole',
        type: 'line',
        data: downhole,
        color: this.markerSvg(seriesObj.classfication).color,
        legendIndex: index,
        name: seriesObj.frame
      });
      this.dynaOptions?.series?.push({
        id: seriesObj.frame + '-surface',
        type: 'line',
        data: surface,
        legendIndex: index,
        color: this.markerSvg(seriesObj.classfication).color,
        linkedTo: ':previous',
        name: seriesObj.frame
      });
    }
    else {
      this.dynaOptions.series?.filter(
        x => x.id == seriesObj.frame + '-downhole' || x.id == seriesObj.frame + '-surface'
      ).forEach(
        x => {
          var id = this.dynaOptions.series?.findIndex(y => y.id == x.id);
          this.dynaOptions.series?.splice(id || 0, 1);
        });
    }
    this.updateDynaHighChartFlag = true;
  }

  ///dynacard graph

  dynaOptions: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      backgroundColor: undefined
    },
    legend: {
      itemStyle: {
        color: 'black'
      },
      itemHoverStyle: {
        color: 'grey'
      }
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Load'
      },
      labels: {
        style: {
          color: 'black'
        }
      }
    },
    xAxis: {
      title: {
        text: 'Position'
      },
      type: 'category',
      tickInterval: 10,
      labels: {
        style: {
          color: 'black'
        }
      }
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

  dynaQuickViewOptions: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      backgroundColor: undefined
    },
    legend: {
      itemStyle: {
        color: 'black'
      },
      itemHoverStyle: {
        color: 'grey'
      }
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Load'
      },
      labels: {
        style: {
          color: 'black'
        }
      }
    },
    xAxis: {
      title: {
        text: 'Position'
      },
      type: 'category',
      tickInterval: 10,
      labels: {
        style: {
          color: 'black'
        }
      }
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

  ///Seleed Time series


  mappingOfFields = {
    pumpFillage_per: 'Pump Fillage(%) ',
    SPM: 'SPM',
    minPolishedRodLoad_lbs: 'Min.Polished Rod Load(lbs)',
    peakPolishedRodLoad_lbs: 'Peak Polished Rod Load(lbs)',
    surfaceStrokeLength_in: 'Surface Stroke Length (in)',
    downholeStrokeLength_in: 'Downhole Stroke Length (in)',
    totalFluid_in: 'Total Fluid (in)',
  } as any;

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
      type: 'category',
      labels: {
        style: {
          color: 'black'
        }
      }
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


  // BAR CHART

  // chartOptions: Highcharts.Options = {
  //   title: {
  //     text: ''
  //   },
  //   chart: {
  //     plotShadow: true,
  //     renderTo: 'container',
  //     backgroundColor: undefined
  //   },

  //   xAxis: {
  //     categories: ['Runtime(%) 23-06-20', 'Inferred Production(bpd) 23-06-21'],
  //     // labels:{
  //     //   enabled:false
  //     // }
  //     labels: {
  //       style: {
  //         fontSize: '9px'
  //       }
  //     }
  //   },

  //   yAxis: {
  //     // allowDecimals: false,
  //     // min: 100,
  //     labels: {
  //       enabled: false
  //     },
  //     title: {
  //       text: ''
  //     },
  //     tickLength: 0,
  //     gridLineWidth: 0
  //   },
  //   legend: {
  //     enabled: false,
  //   },

  //   tooltip: {
  //     enabled: false,
  //     // headerFormat: '<b>{point.x}</b><br/>', pointFormat:

  //     //   '{series.name}:</b> Total: {point.stackTotal}',
  //   },

  //   plotOptions: {
  //     // column: {
  //     //   stacking: 'normal',
  //     //   allowPointSelect: true,
  //     // },
  //   },

  //   series: [

  //     {
  //       name: "",
  //       data: [30, 60],
  //       type: 'column',
  //       color: '#3097A7',
  //       pointWidth: 40,
  //       dataLabels: {
  //         enabled: true,
  //         inside: false,
  //         style: {
  //           fontSize: '9px'
  //         }
  //       }
  //     },
  //     // {
  //     //   name: "",
  //     //   data: [78, 68],
  //     //   type: 'column',
  //     //   color: '#3097A7',
  //     //   pointWidth: 40
  //     // },

  //   ],
  // };
  // BAR CHART
}


