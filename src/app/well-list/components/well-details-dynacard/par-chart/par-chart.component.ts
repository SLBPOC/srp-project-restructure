import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ParaModel } from 'src/app/shared/models/parameterGraphModel';

@Component({
  selector: 'app-par-chart',
  templateUrl: './par-chart.component.html',
  styleUrls: ['./par-chart.component.scss']
})
export class ParChartComponent {

  variables = new FormControl();
  extraColumnsList: { label: string, accessor: string, header: string }[] = [
    { label: 'Yesterday Cycle Counter', accessor: 'yesterdayCycleCounter', header: 'Yesterday Cycle Counter' },
    { label: 'Yesterday Cycle Run', accessor: 'yesterdayCycleRun', header: 'Yesterday Cycle Run' },
    { label: 'Average Pump Fillage', accessor: 'averagePumpFillage', header: 'Average Pump Fillage' },
    { label: 'Average SPM', accessor: 'averageSPM', header: 'Average SPM' },
    { label: 'Production Index', accessor: 'productionIndex', header: 'Production Index' },
    { label: 'Load', accessor: 'load', header: 'Load' }
  ];
  variableList = ['Yesterday Cycle Counter', 'Yesterday Cycle Run', 'Average Pump Fillage', 'Average SPM', 'Production Index', 'Load'];
  selectedVariables: any;
  public ChartOptions: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartRef: any;
  series: any[] = [];
  yaxisdataarray = [{
    labels: { style: { fontSize: 10 } },
    lineWidth: 0,
    title: { text: null }
  },
  {
    labels: { style: { fontSize: 10 } },
    lineWidth: 0,
    opposite: true,
    title: { text: null }
  }];
  updateFromInput = false;
  graphYAxisCycleCounter: any[] = [];
  graphYAxisCycleRun: any[] = [];
  graphYAxisPumpFillage: any[] = [];
  graphYAxisAvgSPM: any[] = [];
  graphYAxisPrdIndex: any[] = [];
  graphYAxisLoad: any[] = [];

  graphXAxis: any[] = [];
  wellparamList: ParaModel[] = [];
  WellArr: string[] = [];
  namearr: string[] = [];

  constructor(private _parameterGraphService: DashboardService, private datepipe: DatePipe) {
    this.selectedVariables = "Yesterday Cycle Counter', 'Yesterday Cycle Run";
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  ngOnInit() {
    this.GetGraphDetails();
  }

  GetGraphDetails() {
    this._parameterGraphService.GetParameterChart(1).subscribe((response: any) => {
      this.wellparamList = response;
      for (let i = 0; i < this.wellparamList.length; i++) {
        this.wellparamList[i].createdDateTime = this.datepipe.transform(this.wellparamList[i].createdDateTime, 'MM/dd/YYYY');
      }
      this.graphXAxis = this.wellparamList.map(item => item.createdDateTime).filter((value, index, self) => self.indexOf(value) === index);
      this.BindSeriesDetails();
    });
  }

  BindSeriesDetails() {
    var id = 0;
    this.series = [];
    if (this.wellparamList != null) {
      this.WellArr = this.wellparamList.map(item => item.wellName).filter((value, index, self) => self.indexOf(value) === index);
      for (let j = 0; j < this.WellArr.length; j++) {
        this.graphYAxisCycleCounter = [];
        this.graphYAxisCycleRun = [];
        for (let i = 0; i < this.wellparamList.length; i++) {
          if (this.wellparamList[i].wellName == this.wellparamList[j].wellName) {
            this.graphYAxisCycleCounter.push([this.wellparamList[i].createdDateTime.toString(), this.wellparamList[i].cycleToday]);
            this.graphYAxisCycleRun.push([this.wellparamList[i].createdDateTime.toString(), this.wellparamList[i].effectiveRuntime]);
            this.graphYAxisPumpFillage.push([this.wellparamList[i].createdDateTime.toString(), this.wellparamList[i].pumpFillage]);
            this.graphYAxisAvgSPM.push([this.wellparamList[i].createdDateTime.toString(), this.wellparamList[i].strPM]);
            this.graphYAxisPrdIndex.push([this.wellparamList[i].createdDateTime.toString(), this.wellparamList[i].inferredProduction]);
            this.graphYAxisLoad.push([this.wellparamList[i].createdDateTime.toString(), this.wellparamList[i].minMaxLoad]);
          }
        }

        if (this.selectedVariables.includes('Yesterday Cycle Counter')) {
          this.series.push({ id: id++, name: "Yesterday Cycle Counter", well: this.WellArr, data: this.graphYAxisCycleCounter.sort(), color: '#5D1D03', lineWidth: 2, visible: true, yAxis: 0 });
        }

        if (this.selectedVariables.includes('Yesterday Cycle Run')) {
          this.series.push({ id: id++, name: "Yesterday Cycle Run", well: this.WellArr, data: this.graphYAxisCycleRun.sort(), color: '#ffe600', lineWidth: 2, visible: true, yAxis: 1 });
        }

        if (this.selectedVariables.includes('Average Pump Fillage')) {
          this.series.push({ id: id++, name: "Average Pump Fillage", well: this.WellArr, data: this.graphYAxisPumpFillage.sort(), color: '#1321F5', lineWidth: 2, visible: true, yAxis: 1 });
        }

        if (this.selectedVariables.includes('Average SPM')) {
          this.series.push({ id: id++, name: "Average SPM", well: this.WellArr, data: this.graphYAxisAvgSPM.sort(), color: '#F513F2', lineWidth: 2, visible: true, yAxis: 1 });
        }

        if (this.selectedVariables.includes('Production Index')) {
          this.series.push({ id: id++, name: "Production Index", well: this.WellArr, data: this.graphYAxisPrdIndex.sort(), color: '#3FF513', lineWidth: 2, visible: true, yAxis: 1 });
        }

        if (this.selectedVariables.includes('Load')) {
          this.series.push({ id: id++, name: "Load", well: this.WellArr, data: this.graphYAxisLoad.sort(), color: '#F55413', lineWidth: 2, visible: true, yAxis: 1 });
        }

      }

      this.BindChart();
    }
  }

  onChange($event: any) {
    if ($event.checked)
      this.namearr.push($event.source.value);
    else {
      this.namearr.forEach((value, index) => {
        if (value == $event.source.value)
          this.namearr.splice(index, 1);
      });
    }
    this.selectedVariables = this.namearr
    this.BindSeriesDetails();
  }

  HideSeries(legendName: string) {
    this.series.forEach(element => {
      if (element.name == legendName) {
        if (element.visible == undefined) {
          element.visible = false;
        }
        else {
          element.visible = element.visible == true ? false : true;
        }

      }
    });
    this.BindChart();
  }

  showTooltip(id: any) {
    var tooltip = this.series.filter(a => a.id == id);
    if (tooltip.length > 0) {
      return tooltip[0].well;
    }
    else {
      return "";
    }

  }

  BindChart() {
    var that = this;
    this.ChartOptions = {
      chart: {
        renderTo: 'container',
        type: 'line',
        margin: 80,
        events: {
          load: function () {
            var chart: any = this;

          }
        }
      },
      title: {
        text: '',
        marginTop: 0
      },
      legend: {
        layout: "horizontal",
        align: "left",
        useHTML: true,
        maxHeight: 60,
        symbolHeight: 0,
        symbolWidth: 0,
        symbolRadius: 0,
        labelFormatter: function () {
          var chart: any = this;
          return '<span><div style="height: 10px;width: 10px;background-color:' + chart.color + ';display: inline-block; margin-right: 5px;"></div>' + chart.name + '</span>';
        }
      },
      tooltip: {
        formatter(this: Highcharts.TooltipFormatterContextObject) {
          var wellname = that.showTooltip(this.series.options.id);
          return "X:" + this.x + "<br/>Y:" + this.y + "<br/>Name:" + this.series.name + "<br/>Well:" + wellname;
        }
      },
      yAxis: this.yaxisdataarray,
      xAxis: {
        type: 'category',
        categories: this.graphXAxis,
        gridLineWidth: 1,
        labels: { rotation: 0, style: { fontSize: 10 } }
      },
      plotOptions: {
        series: {
          marker: { symbol: 'circle', radius: 2 },
          states: { inactive: { enabled: false } },
          events: {
            legendItemClick: function (e: Highcharts.SeriesLegendItemClickEventObject) {
              that.HideSeries(e.target.name);
            },
            mouseOver: function (e: any) {
            },
          }
        }
      },
      series: this.series,
    } as any;
  }




}

