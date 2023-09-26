import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
import { DynacardService } from '../../../../shared/services/dynacard.service';
import * as Highcharts from 'highcharts';
import { DynacardModel2 } from 'src/app/shared/models/dyna-card.model';

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
    this.dynaservice.selectedTimeInGraph.next(p.point.series.name);
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
    })).subscribe((x: any) => {
      if (x.name == 'all')
        this.removeAllSeries();
      else
        this.updateInHighChartv2(x.dynaDetails, x.dynaDetails != undefined, x.name);
    });
  }

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

  removeAllSeries() {
    if(this.options.series)
    this.options.series.splice(0, this.options.series.length);
    this.updateHighChartFlag = true;
  }

  updateInHighChartv2(dynacard: DynacardModel2[], addedOrRemoved: boolean, name: string) {
    if (addedOrRemoved) {
      var downhole = dynacard.map(x => [x.downhole_Card_Position, x.downhole_Card_Load]);
      var surface = dynacard.map(x => [x.surface_Card_Position, x.surface_Card_Load]);
      this.options?.series?.push({
        id: name + '-downhole',
        type: 'line',
        data: downhole,
        colorIndex: this.Index,
        name: name
      });
      this.options?.series?.push({
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
      this.options?.series?.filter(
        (x: any) => x.id == name + '-downhole' || x.id == name + '-surface'
      ).forEach(
        (x: any) => {
          var id = this.options?.series?.findIndex(y => y.id == x.id);
          if(id)
          this.options?.series?.splice(id, 1);
        });
    }
    this.updateHighChartFlag = true;
  }

}