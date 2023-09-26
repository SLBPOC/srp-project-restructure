import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/brand-dark';
theme(Highcharts);
import { SurfaceCardPumpService } from '../../../shared/services/surface-card-pump.service';

@Component({
  selector: 'app-surface-card-pump',
  templateUrl: './surface-card-pump.component.html',
  styleUrls: ['./surface-card-pump.component.scss']
})

export class SurfaceCardPumpComponent {
  constructor(private service:SurfaceCardPumpService ) {}
  ngOnInit(): void {
    this.getChartData();
 }
 public surfaceCardpump: any=[];
   
 getChartData(): void{
  this.chartSubscription = this.service.surfaceChartData().subscribe((data: any) => {
    this.series = data;
    this.drawChart();
  })
 }

  series: any;
  chartSubscription: any;
  drawChart(): void {
    Highcharts.chart('line-chart', {
      chart: {
        type: 'line'
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
              verticalAlign: 'top',
      },
      
      yAxis: [{
        lineWidth: 1,
        title: {
            text: 'Surface Card Pump Fill',
        },
        plotLines: [{
          value: 200,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
              text: ''
          }
      }, {
          value: 600,
          color: 'green',
          dashStyle: 'shortdash',
          width: 2,
          label: {
              text: ''
          }
      }]
    }, 
  ],
    plotOptions: {
      series: {
          marker: {
              symbol: 'circle'
          }
      }
    },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: this.series
    } as any);
   }
   
   ngOnDestroy(): void {
    this.chartSubscription.unsubscribe();
}

}
