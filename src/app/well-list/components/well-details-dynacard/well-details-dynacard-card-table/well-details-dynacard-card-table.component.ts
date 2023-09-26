
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { BehaviorSubject, Subject,of } from 'rxjs';
import { DynacardService } from '../../../../shared/services/dynacard.service';
@Component({
  selector: 'app-well-details-dynacard-card-table',
  templateUrl: './well-details-dynacard-card-table.component.html',
  styleUrls: ['./well-details-dynacard-card-table.component.scss']
})
export class WellDetailsDynacardCardTableComponent {
  displayedColumns: string[] = ['#', 'card', 'time', 'minimunpolishedrodload', 'peakpolishedrod'];
  listOfTime!: any;
  selectedClassification = new BehaviorSubject<number>(0);
  searchText!:string;
  searchTextObseravale = new Subject<string>();
  
  constructor(private dynaService: DynacardService) {
    this.dynaService.selectedClassification.subscribe(
      (x) => {
      }
    )
  }

  searchTime(){
    this.searchTextObseravale.next(this.searchText);
  }

  randomInteger(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
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