import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
import { DynacardService } from '../../../services/dynacard.service';
import { DynaCardModel, DynacardModel2 } from '../../../model/dyna-card.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-well-details-dynacard-view-graph',
  templateUrl: './well-details-dynacard-view-graph.component.html',
  styleUrls: ['./well-details-dynacard-view-graph.component.scss']
})
export class WellDetailsDynacardViewGraphComponent implements OnInit, OnDestroy {

  $takUntil = new Subject<boolean>();

  constructor(private dynaservice: DynacardService) {
  }
  ngOnDestroy(): void {
    this.$takUntil.next(true);
    this.$takUntil.complete();
  }
  onPointClick : Highcharts.PointClickCallbackFunction = (p)=> {
    // console.log(p.point.series.name);
    this.dynaservice.selectedTimeInGraph.next(p.point.series.name);
    // console.log(p.point.options.z)
  }
  ngOnInit(): void {
    this.dynaservice.selectedTime.pipe(takeUntil(this.$takUntil), switchMap(obj => {
      if (obj.addedOrRemoved) {
        return this.dynaservice.getDynaCardDetailsForATime(obj.selected)
          .pipe(
            takeUntil(this.$takUntil),
            map(y => ({ dynaDetails: y, name: obj.selected })));
      }
      else {
        return of(({ dynaDetails: undefined, name: obj.selected }));
      }
    })).subscribe(x => {
      if (x.name == 'all')
        this.removeAllSeries();
      else
        this.updateInHighChartv2(x.dynaDetails, x.dynaDetails != undefined, x.name);
    });
  }



  // csvFile: any;
  // private csvText: string = "";
  // allData: DynaCardModel[] | null = null;
  Index: number = 0;

  Highcharts: typeof Highcharts = Highcharts;
  updateHighChartFlag: boolean = false;
  options: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      backgroundColor: undefined
    },
    legend: {

    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Load'
      }
    },
    xAxis: {
      title: {
        text: 'Position'
      },
      type: 'category',
      tickInterval: 10
    },
    plotOptions:{
      series:{
        point:{
          events:{
            click:this.onPointClick
          }
        }
      }
    },
    series: []
  };

  // updateChart(event: any) {
  //   this.updateCsvData(event);
  // }

  removeAllSeries() {
    this.options.series.splice(0, this.options.series.length);
    this.updateHighChartFlag = true;
  }

  updateInHighChartv2(dynacard: DynacardModel2[], addedOrRemoved: boolean, name: string) {
    console.log(dynacard, addedOrRemoved);
    // return;
    if (addedOrRemoved) {
      var downhole = dynacard.map(x => [x.downhole_Card_Position, x.downhole_Card_Load]);
      var surface = dynacard.map(x => [x.surface_Card_Position, x.surface_Card_Load]);
      this.options.series.push({
        id: name + '-downhole',
        type: 'line',
        data: downhole,
        colorIndex: this.Index,
        name: name
      });
      this.options.series.push({
        id: name + '-surface',
        type: 'line',
        data: surface,
        colorIndex: this.Index,
        linkedTo: ':previous',
        name: name
      });
      this.Index++;
    }
    else {
      this.options.series.filter(
        x => x.id == name + '-downhole' || x.id == name + '-surface'
      ).forEach(
        x => {
          var id = this.options.series.findIndex(y => y.id == x.id);
          this.options.series.splice(id, 1);
        });
    }
    this.updateHighChartFlag = true;
  }

  // updateInHighChart() {
  //   var downhole = this.allData.map(x => [x.DownholeCardPosition, x.DownholeCardLoad]);
  //   var surface = this.allData.map(x => [x.SurfaceCardPosition, x.SurfaceCardLoad]);
  //   console.log(this.allData[0]);
  //   this.options.series.push({
  //     type: 'line',
  //     data: downhole,
  //     colorIndex: this.Index,
  //     name: this.allData[0].DownholeCardTime
  //   });
  //   this.options.series.push({
  //     type: 'line',
  //     data: surface,
  //     colorIndex: this.Index,
  //     linkedTo: ':previous',
  //     name: this.allData[0].DownholeCardTime
  //   })
  //   this.updateHighChartFlag = true;
  //   this.Index++;
  // }

  // mapToArray() {
  //   var data: DynaCardModel[] = d3.csvParse(this.csvText);
  //   data.forEach(x => {
  //     x.DownholeCardLoad = +x.DownholeCardLoad;
  //     x.DownholeCardPosition = +x.DownholeCardPosition;
  //     x.SurfaceCardLoad = +x.SurfaceCardLoad;
  //     x.SurfaceCardPosition = +x.SurfaceCardPosition;
  //     x.DownholeCardTime = x["DownholeCard Time"]
  //     x.SurfaceCardTime = x["SurfaceCard Time"]
  //   })
  //   this.allData = data;
  //   this.updateInHighChart();
  // }

  // updateCsvData(event: any) {
  //   let fileReader = new FileReader();
  //   fileReader.onload = (e: any) => {
  //     this.csvText = <string>fileReader.result;
  //     this.mapToArray();
  //   }
  //   fileReader.readAsText(event.target.files[0]);
  // }
}
