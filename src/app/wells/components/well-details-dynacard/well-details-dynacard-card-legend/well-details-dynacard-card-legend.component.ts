import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { AlgorithmsAndMitigationsService } from '../../../../shared/services/algorithms-and-mitigations.service';
import { DynacardService } from '../../../../shared/services/dynacard.service';

@Component({
  selector: 'app-well-details-dynacard-card-legend',
  templateUrl: './well-details-dynacard-card-legend.component.html',
  styleUrls: ['./well-details-dynacard-card-legend.component.scss']
})
export class WellDetailsDynacardCardLegendComponent implements OnInit {

  series: any = [];
  chartInfo!: any;
  chartSubscription!: Subscription;
  chartInfoSubscription!: Subscription;

  constructor(private service: AlgorithmsAndMitigationsService, private dynaService: DynacardService) { }
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

  onPointClick: Highcharts.PointClickCallbackFunction = (p) => {
  }

  onShowEvent = (p: any) => {
    console.log(p);
  }

  drawChart() {
    var options: Highcharts.Options = {
      chart: {
        type: 'bubble',
        spacing: [0, 0, 0, 0],
        zooming: {
          type: 'x'
        },
        backgroundColor: undefined
      },
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
            fillOpacity: 1
          },
          dataLabels: {
            enabled: true,
            format: `<b>{point.z}</b>`,
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal'
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
      series: this.series
    };
    Highcharts.chart('bubble-chart', options);
  }
}