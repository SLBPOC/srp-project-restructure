import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-spm-measured',
  templateUrl: './spm-measured.component.html',
  styleUrls: ['./spm-measured.component.scss']
})
export class SpmMeasuredComponent {
  chart: any;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartCallback: any;
  chartOptions1: any;
  chartOptions2: any;
  chartOptions: any
  activity = {
    xData: [
      0.001567, 0.011765, 0.022194, 0.032316, 0.04266, 0.063668, 0.074477,
      0.085323, 0.09576, 0.106078, 0.116096, 0.137524, 0.148342, 0.159059,
      0.170005, 0.180716, 0.191407, 0.212538, 0.222819, 0.233929,
    ],
    datasets: [
      {
        name: 'Surface Card Pump fill',
        data: [
          13.833, 12.524, 11.441, 10.651, 9.961, 4.566, 4.617, 4.728, 4.823,
          4.844, 4.856, 4.87, 4.702, 4.679, 4.674, 4.641, 4.47, 4.688, 4.798,
          4.756,
        ],
        unit: 'km/h',
        type: 'line',
        valueDecimals: 1,
      },
      {
        name: 'SPM Measured',
        data: [
          26.857, 27, 27.111, 27.2, 27.272, 30.545, 32.181, 33.818, 35.272,
          36.545, 37.818, 41.818, 44.545, 47.272, 48.545, 49.818, 53.545, 61,
          64.909, 68.818,
        ],
        unit: 'm',
        type: 'line',
        valueDecimals: 0,
      },
    ],
  };
  label: any;

  ngOnInit() {
    this.activity.datasets.forEach((dataset, i) => {
      const data = dataset.data.map((val, j) => [this.activity.xData[j], val]);
      this[`chartOptions1`] = {
        chart: {
          marginLeft: 40,
          spacingTop: 20,
          spacingBottom: 20,
          height: 220,
        },
        title: {
          text: dataset.name,
          align: 'left',
          margin: 0,
          x: 30,
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          crosshair: true,
          events: {
            setExtremes: (e: any) => {
              const thisChart = this.chart;

              if (e.trigger !== 'syncExtremes') {
                Highcharts.charts?.forEach((chart) => {
                  if (chart !== thisChart) {
                    if (chart?.xAxis[0].setExtremes) {
                      chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        {
                          trigger: 'syncExtremes',
                        }
                      );
                    }
                  }
                });
              }
            },
          },
          labels: {
            format: '{value} km',
          },
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        tooltip: {
          positioner: (e: any) => {
            return {
              x: this.chart.chartWidth - this.label.width,
              y: 10, // align to title
            };
          },
          borderWidth: 0,
          backgroundColor: 'none',
          pointFormat: '{point.y}',
          headerFormat: '',
          shadow: false,
          style: {
            fontSize: '18px',
          },
          valueDecimals: dataset.valueDecimals,
        },
        series: [
          {
            data: data,
            name: dataset.name,
            type: dataset.type,
            color: Highcharts.getOptions().colors?.at(1),
            fillOpacity: 0.3,
            tooltip: {
              valueSuffix: ' ' + dataset.unit,
            },
          },
        ],
      }
      this[`chartOptions2`] = {
        chart: {
          marginLeft: 40, // Keep all charts left aligned
          spacingTop: 20,
          spacingBottom: 20,
          height: 220,
        },
        title: {
          text: dataset.name,
          align: 'left',
          margin: 0,
          x: 30,
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          crosshair: true,
          events: {
            setExtremes: (e: any) => {
              const thisChart = this.chart;

              if (e.trigger !== 'syncExtremes') {
                Highcharts.charts?.forEach((chart) => {
                  if (chart !== thisChart) {
                    if (chart?.xAxis[0].setExtremes) {
                      chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        {
                          trigger: 'syncExtremes',
                        }
                      );
                    }
                  }
                });
              }
            },
          },
          labels: {
            format: '{value} km',
          },
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        tooltip: {
          positioner: (e: any) => {
            return {
              x: this.chart.chartWidth - this.label.width,
              y: 10, // align to title
            };
          },
          borderWidth: 0,
          backgroundColor: 'none',
          pointFormat: '{point.y}',
          headerFormat: '',
          shadow: false,
          style: {
            fontSize: '18px',
          },
          valueDecimals: dataset.valueDecimals,
        },
        series: [
          {
            data: data,
            name: dataset.name,
            type: dataset.type,
            color: Highcharts.getOptions().colors?.at(2),
            fillOpacity: 0.3,
            tooltip: {
              valueSuffix: ' ' + dataset.unit,
            },
          },
        ],
      }
    });
  }

  addHighlight(e: MouseEvent | PointerEvent | TouchEvent) {
    let chart, point, i, event;
    const charts = Highcharts.charts;
    charts.forEach((chart: any, index) => {
      if (chart) {
        chart = charts[index];
        event = chart.pointer.normalize(e);
        point = (chart.series[0] as any).searchPoint(event, true);
        if (point) {
          point.highlight(e);
        }
      }
    });
  }

}

