import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { YAxisOptions } from 'highcharts';
import * as moment from 'moment';


export class range {
  name: string;
  min: number;
  max: number;
}


@Component({
  selector: 'app-well-view-parameters',
  templateUrl: './well-view-parameters.component.html',
  styleUrls: ['./well-view-parameters.component.css']
})
export class WellViewParametersComponent {
  duration = {
    hour: 60,
    day: 24,
    week: 7,
    month: 30,
  }

  rangeList: range[] = [
    {
      min: 0,
      max: 100,
      name: 'SPM Measured'
    },
    {
      min: 110,
      max: 200,
      name: 'yesterdayPercentageRun'
    },
    {
      min: 210,
      max: 300,
      name: 'DynacardClass'
    },
    {
      min: 310,
      max: 400,
      name: 'Pump Intake Pressure'
    }
  ];

  updateFlag: boolean = false;
  isScatter: boolean = false;
  isMultipleYAxis:boolean=false;
  changeMultipleYAxis(){

  }
  options: Highcharts.Options = {
    chart: {
      width: 1500,
      height: 550,
      backgroundColor:undefined
    },
    title: {
      text: 'Well View Parameters'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: [
      {
        title: {
          text: 'Datas'
        },
        enabled:true,
      },
      {
        title: {
          text: 'yesterdayPercentageRun'
        },
        visible:false,
      },
      {
        title: {
          text: 'DynacardClass'
        },
        visible:false,
      },
      {
        title: {
          text: 'Pump Intake Pressure'
        },
        visible:false,
      }
    ],
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    },
    legend: {
      // layout: 'ho',
      align: 'center',
      verticalAlign: 'top',
      // floating: true,
    },
  };

  currentDuration = this.duration.hour;

  Highcharts: typeof Highcharts = Highcharts;
  constructor() {
    this.options.series = [
      {
        type: 'line',
        data: this.GetRandomNumbers(this.rangeList[0]),
        name: this.rangeList[0].name,
        yAxis:0
      }]
  }
  pushRange() {
    if (this.options.series.length < this.rangeList.length) {
      this.options.series?.push(
        {
          type: this.isScatter ? 'scatter' : 'line',
          name: this.rangeList[this.options.series.length].name,
          data: this.GetRandomNumbers(this.rangeList[this.options.series.length]),
          yAxis: this.isMultipleYAxis ? this.options.series.length : 0
        }
      );
      if(this.isMultipleYAxis)
      {
        for (let index = 1; index < this.options.series.length; index++) {
          (<Array<YAxisOptions>>this.options.yAxis)[index].visible = true;
        }
      }
      else {
        (<Array<YAxisOptions>>this.options.yAxis).forEach(x=>x.visible = false);
        (<Array<YAxisOptions>>this.options.yAxis)[0].visible = true;
      }
      this.updateFlag = true;
    }
    else {
      alert('Maximum Reached!!');
    }
  }

  removeRange() {
    if (this.options.series.length > 1) {
      (<Array<YAxisOptions>>this.options.yAxis)[this.options.series.length-1].visible = false;
      this.options.series.pop();
      this.updateFlag = true;
    }
  }

  durationChanged() {
    for (let index = 0; index < <number>this.options.series?.length; index++) {
      (<Highcharts.SeriesLineOptions>this.options.series[index]).data = this.GetRandomNumbers(this.rangeList[index])
    }
    this.updateFlag = true;
  }

  changeScatter() {
    this.options.series?.forEach(x => { x.type = this.isScatter ? 'scatter' : 'line'; });
    this.updateFlag = true;
  }

  GetRandomNumbers(range: range) {
    var integers = [];
    for (let index = 0; index < (<number>this.currentDuration); index++) {
      var xValue = this.GetDateTime(index);
      integers.push([xValue, (Math.random() * (range.max - range.min) + range.min)]);
    }
    console.log(integers);
    return integers;
  }

  GetDateTime(i: number) {
    var currentDate = moment();
    if (this.currentDuration == this.duration.hour) {
      return currentDate.subtract(1, 'hour').add(i, 'minute').format('HH:mm');
    }
    else if (this.currentDuration == this.duration.day) {
      return currentDate.subtract(1, 'day').add(i, 'hour').format('HH:mm');
    }
    else if (this.currentDuration == this.duration.month) {
      return currentDate.subtract(1, 'month').add(i, 'day').format('DD/MM/yyyy');
    }
    else if (this.currentDuration == this.duration.week) {
      return currentDate.subtract(1, 'week').add(i, 'day').format('DD/MM');
    }
    else {
      return i;
    }
  }
}
