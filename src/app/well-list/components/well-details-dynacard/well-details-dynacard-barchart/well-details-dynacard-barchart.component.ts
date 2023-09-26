import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-well-details-dynacard-barchart',
  templateUrl: './well-details-dynacard-barchart.component.html',
  styleUrls: ['./well-details-dynacard-barchart.component.scss']
})
export class WellDetailsDynacardBarchartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: ''
    },
    chart: {
      plotShadow: true,
      renderTo: 'container',
      backgroundColor:undefined
    },

    xAxis: {
      categories: ['Runtime(%) 23-06-20', 'Inferred Production(bpd) 23-06-21'],
    },

    yAxis: {
      labels:{
        enabled:false
      },
      title:{
        text:''
      },
      tickLength:0,
      gridLineWidth:0
    },
    legend:{
      enabled:false
    },

    tooltip: {
      enabled:false,
    },

    plotOptions: {
    },

    series: [

      {
        name: "",
        data: [40, 55],
        type: 'column',
        color: '#3097A7',
        pointWidth: 40,
        dataLabels:{
          enabled:true,
        }
      },
    ],
  };

}