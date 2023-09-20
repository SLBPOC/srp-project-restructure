import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
// import theme from 'highcharts/themes/brand-dark';
// theme(Highcharts);
// import More from 'highcharts/highcharts-more';
import { Subscription } from 'rxjs';
import { AlgorithmsAndMitigationsService } from '../../../services/algorithms-and-mitigations.service';
import { DynacardService } from '../../../services/dynacard.service';

// import Highcharts from 'highcharts'
// More(Highcharts)

@Component({
  selector: 'app-well-details-dynacard-card-legend',
  templateUrl: './well-details-dynacard-card-legend.component.html',
  styleUrls: ['./well-details-dynacard-card-legend.component.scss']
})
export class WellDetailsDynacardCardLegendComponent implements OnInit {

  series: any = [];
  // chartData!: any;
  chartInfo!: any;
  // Highcharts: typeof Highcharts = Highcharts;
  // chartOptions!: Highcharts.Options;
  chartSubscription!: Subscription;
  chartInfoSubscription!: Subscription;

  constructor(private service: AlgorithmsAndMitigationsService,private dynaService:DynacardService) { }
  ngOnInit(): void {
    this.getChartData();
    this.getChartInfo();
  }

  getChartData(): void {
    this.chartSubscription = this.service.getBubbleChartData().subscribe((data: any) => {
      this.series = data;
      this.drawChart();
    })
    this.drawChart();
  }

  getChartInfo() {
    this.chartInfoSubscription = this.service.getChartInfo().subscribe((data: any) => {
      this.chartInfo = data;
      console.log(this.chartInfo);
    })
  }

  onPointClick : Highcharts.PointClickCallbackFunction = (p)=> {
    // this.dynaService.selectedClassification.next(p.point.options.z);
    // console.log(p.point.options.z)
  }

  onShowEvent = (p) =>{
    console.log(p);
  }

  drawChart() {
    var options: Highcharts.Options = {
      chart: {
        type: 'bubble',
        // plotBorderWidth: 1,
        spacing:[0,0,0,0],
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
        type:'category'
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
          marker:{
            fillOpacity:1
          },
          // zMin: 0,
          // zMax: 1000,
          // layoutAlgorithm: {
          //   splitSeries: false,
          //   gravitationalConstant: 0.02
          // },
          dataLabels: {
            enabled: true,
            format: `<b>{point.z}</b>`,
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal'
            }
          },
          point:{
            events:{
              click: this.onPointClick
            }
          },
          events:{
            afterAnimate : this.onShowEvent,
            show:this.onShowEvent
          },
          cursor:'pointer',
          states: {
            hover: {
              enabled: false
            }
            ,inactive:{
              enabled:false
            }
          }
        }
      },
      series: this.series
    };
    Highcharts.chart('bubble-chart', options);
  }
}

