
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
// import {MatTableDataSource} from '@angular/material';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, map,switchMap,BehaviorSubject, Subject,of } from 'rxjs';
import { DynacardService } from '../../../services/dynacard.service';
// import { off } from 'process';

// export interface PeriodicElement {
//   card: string ;
//   time: string;
//   minimunpolishedrodload:number;
//   peakpolishedrod:string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {card: 'pumptagging', time: "2020-04-14 13:14:59", minimunpolishedrodload: 1.0079, peakpolishedrod: '30,310 lbs'},
//   {card: 'pumptagging', time: "2020-04-14 13:14:59", minimunpolishedrodload: 4.0026, peakpolishedrod: '30,310 lbs'},
//   {card: 'pumptagging', time: "2020-04-14 13:14:59", minimunpolishedrodload: 6.941, peakpolishedrod:'30,310 lbs'},
//   {card: 'pumptagging', time: "2020-04-14 13:14:59", minimunpolishedrodload: 9.0122, peakpolishedrod: '30,310 lbs'},
//   {card: 'pumptagging', time: "2020-04-14 13:14:59", minimunpolishedrodload: 10.811, peakpolishedrod: '30,310 lbs'},

// ];
@Component({
  selector: 'app-well-details-dynacard-card-table',
  templateUrl: './well-details-dynacard-card-table.component.html',
  styleUrls: ['./well-details-dynacard-card-table.component.scss']
})
export class WellDetailsDynacardCardTableComponent {
  displayedColumns: string[] = ['#', 'card', 'time', 'minimunpolishedrodload', 'peakpolishedrod'];
  listOfTime: Observable<string[]>;
  selectedClassification = new BehaviorSubject<number>(0);
  searchText:string;
  searchTextObseravale = new Subject<string>();
  // displayedColumns: string[] = ['#', 'Name', 'Change', 'Classfication'];

  constructor(private dynaService: DynacardService) {
    this.dynaService.selectedClassification.subscribe(
      (x) => {
        // this.selectedClassification.next(x % 8);
        // this.dynaService.selectedTime.next({addedOrRemoved:false,selected:'all'});
        // this.selectionTimeModel.clear();
        // this.searchText = '';
        // this.searchTextObseravale.next('');
        // console.log(this.selectedClassification)
      }
    )
  }

  searchTime(){
    this.searchTextObseravale.next(this.searchText);
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    // this.listOfTime = this.dynaService.getListOfTime()
    //   .pipe(
    //     switchMap(x=> this.selectedClassification.pipe(map(
    //       v => {
    //         var result =x != undefined ? x.filter((t, i) => (i+1) % v) : [];
    //         return result;
    //       }
    //     ),
    //     switchMap(x=> this.searchTextObseravale.pipe(map(
    //       text=> {
    //         if(text != "" && text != undefined)
    //         {
    //           return x.filter(t=>t.toLocaleLowerCase().trim().indexOf(text) > -1 );
    //         }
    //         return x;
    //       }
    //     )))
    //     ))
    //   );
  }

  selectionTimeModel = new SelectionModel<string>(true);

  selectTime(item: string) {
    this.selectionTimeModel.toggle(item);
    this.dynaService.selectedTime.next({
      addedOrRemoved: this.selectionTimeModel.isSelected(item),
      selected: item
    })
  }



}
