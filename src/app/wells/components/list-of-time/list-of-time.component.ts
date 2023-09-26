import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DynacardService } from 'src/app/shared/services/dynacard.service';

@Component({
  selector: 'app-list-of-time',
  templateUrl: './list-of-time.component.html',
  styleUrls: ['./list-of-time.component.scss']
})
export class ListOfTimeComponent {

  listOfTime!:Observable<any>;
  displayedColumns: string[] = ['#', 'Name', 'Change', 'Classfication'];
  selectionTimeModel = new SelectionModel<string>(true);

  constructor(private dynaService:DynacardService){}

  selectTime(item:string){
    this.selectionTimeModel.toggle(item);
    this.dynaService.selectedTime.next({
      addedOrRemoved: this.selectionTimeModel.isSelected(item),
      selected:item
    })
  }

}
