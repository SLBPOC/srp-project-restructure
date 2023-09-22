import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/brand-dark';
theme(Highcharts);
import { Subscription } from 'rxjs';
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
    // console.log('algolinechart', data)
    this.series = data;
    // data.forEach(element => {
    //   if(element.name==="Surface Card Pump Fill"){
    //     console.warn("@@@@@@@@@@@@@@@@@@@@@@", element.data + "elements name", element.name)
    //     this.surfaceCardpump.push(element.data)
    //   }
    // });
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
            // colour:'green',
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
