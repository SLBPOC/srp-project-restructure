import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { AlertListService } from 'src/app/shared/services/alert-list.service';

interface IEmbeddedChartData {
  name: string;
  y: number;
  color: string;
}

@Component({
  selector: 'app-alert-categories-table',
  templateUrl: './alert-categories-table.component.html',
  styleUrls: ['./alert-categories-table.component.scss']
})
export class AlertCategoriesTableComponent implements OnInit, OnChanges {
  displayedColumns = ['wellname', 'alertCount', 'snoozAlertCount', 'priority'];
  dataSource: any = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [];
  // chartOptionsArr: Highcharts.Options[] = [];

  loading = true;
  pageSize: number = 5;
  pageNumber = 1;
  currentPage = 0;
  totalCount = 0;
  pageSizeOption = [10, 20, 30]
  @Input() barChartData: any;
  snoozeData!: any[];
  constructor(private alertService: AlertListService) { }

  ngOnInit() {
    this.loading = true;
    this.loadChartData();
    this.loadTable();
  }

  ngOnChanges() {
    this.loadChartData();
    this.loadTable();
  }

  loadTable() {
    this.loading = false;
    this.dataSource = new MatTableDataSource<any>(this.barChartData);
  }

  loadChartData(){
    let chartSeriesArr = []
    let high = {}
    let medium = {}
    let low = {}
    for (let i = 0; i < this.barChartData?.length; i++) {
      high = {
        name: '',
        y: this.barChartData[i].high,
        color: '#D11F1F'
      }
      medium = {
        name: '',
        y: this.barChartData[i].medium,
        color: '#FABB42'
      }
      low = {
        name: '',
        y: this.barChartData[i].low,
        color: '#28A228'
      }
      chartSeriesArr.push(high,medium,low);
      // this.chartOptions.series[i].data
      this.prepateChart([high, medium, low])

    }
    // this.chartOptions.series[0].data
    // this.chartOptions = {
    //   chart: {
    //     type: 'pie',
    //     renderTo: 'container',
    //     margin: 0,
    //     spacing: [0,0,0,0],
    //     backgroundColor: undefined
    //   },
    //   exporting: { enabled: false },
    //   legend : {enabled: false},
      
    //   yAxis: {
    //     labels: {
    //       enabled: false
    //     },
    //     tickAmount: 6,
    //     gridLineWidth: 1,
    //     visible: false
    //   },
    //   xAxis: {
    //     labels: {
    //       enabled: false
    //     },
    //     tickAmount: 6,
    //     gridLineWidth: 1,
    //     visible: false
    //   },
    //   title: {
    //     text: ''
    //   },
    //  plotOptions: {
    //       bar: {
    //           dataLabels: {
    //               enabled: true,
    //               inside: true,
    //               align: 'left',
    //               x: -40
    //           },
    //       },
    //       series: {
           
    //     }
  
    //   },
      
    //   series: [ 
    //     {
    //       type: 'bar',
    //       // data: chartSeriesArr
    //       data: []
    //     }
    //   ]
    // };
  }

  prepateChart(x: any) {

    let chartOptions = {
      chart: {
        type: 'pie',
        renderTo: 'container',
        margin: 0,
        spacing: [0,0,0,0],
        backgroundColor: undefined
      },
      exporting: { enabled: false },
      legend : {enabled: false},
      
      yAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickAmount: 6,
        gridLineWidth: 1,
        visible: false
      },
      title: {
        text: ''
      },
     plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true,
                  inside: true,
                  align: 'left',
                  x: -40
              },
          },
          series: {
           
        }
  
      },
      
      series: [ 
        {
          type: 'bar',
          // data: chartSeriesArr
          data: x
        }
      ]
    } as any;
    this.chartOptions.push(chartOptions)
    // console.log('==> chartOptionArr', this.chartOptionsArr);

  }

  onSortChanged(event: any) {

  }

  getSnoozeByWellName(wellName: string) {
    wellName = 'W012';
    this.alertService.getSnoozeByWellName(wellName).subscribe((data: any) => {
      this.snoozeData = data;
    })
  }

}
export interface PeriodicElement {
  wellname: string;
  noofalerts: number;
  snoozedalerts: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {

    wellname: 'well-001',
    noofalerts: 100,
    snoozedalerts: 35,

  },
  {

    wellname: 'well-002',
    noofalerts: 90,
    snoozedalerts: 20,

  },
  {

    wellname: 'well-003',
    noofalerts: 80,
    snoozedalerts: 20,


  },
  {

    wellname: 'well-004',
    noofalerts: 70,
    snoozedalerts: 30,

  },
  {

    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40,

  },
  {

    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40,

  },
  {

    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40,

  },
  {

    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40,

  },
  {

    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40,

  },

  {
    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40,
  },

  {

    wellname: 'well-005',
    noofalerts: 60,
    snoozedalerts: 40
  },
]