import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-surface-card-pump-fill',
  templateUrl: './surface-card-pump-fill.component.html',
  styleUrls: ['./surface-card-pump-fill.component.scss'],
})
export class SurfaceCardPumpFillComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Surface Card Pump Fill ',
    },

    chart: {
      type: 'boxplot',
    },
    xAxis: {
      categories: ['1'],
      title: {
        text: 'Area',
      },
    },

    yAxis: {
      title: {
        text: 'freq',
      },
      plotLines: [
        {
          value: 932,
          color: 'orange',
          width: 1,
          label: {
            text: ' Mean: 88.15',
            align: 'left',
            style: {
              color: 'green',
            },
          },
        },
      ],
    },

    series: [
      {
        name: 'date',
        data: [
          [733, 853, 939, 980, 1080],
         
        ],
        type: 'boxplot',
        color:'green',
        tooltip: {
          headerFormat: '<em>Experiment No {point.key}</em><br/>',
        },
      },
      {
        name: 'date',
        color: Highcharts.getOptions().colors?.at(0),
        type: 'scatter',
        // data: [
        //   // x, y positions where 0 is the first category
        //   [0, 644],
        //   [4, 718],
        //   [4, 951],
        //   [4, 969],
        // ],
        marker: {
            fillColor: 'orange',
            lineWidth: 1,
            lineColor: Highcharts.getOptions().colors?.at(0)
        },
        // tooltip: {
        //     pointFormat: 'Observation: {point.y}'
        // }
      },
    ],
  };
}
