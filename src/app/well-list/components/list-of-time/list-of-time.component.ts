import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { DynacardService } from '../../services/dynacard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-of-time',
  templateUrl: './list-of-time.component.html',
  styleUrls: ['./list-of-time.component.scss']
})
export class ListOfTimeComponent implements OnInit,OnDestroy {

  listOfTime:Observable<string[]>;
  displayedColumns: string[] = ['#', 'Name', 'Change', 'Classfication'];

  constructor(private dynaService:DynacardService)
  {

  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    // this.listOfTime = this.dynaService.getListOfTime();
  }

  selectionTimeModel = new SelectionModel<string>(true);

  selectTime(item:string){
    this.selectionTimeModel.toggle(item);
    this.dynaService.selectedTime.next({
      addedOrRemoved: this.selectionTimeModel.isSelected(item),
      selected:item
    })
  }
}
