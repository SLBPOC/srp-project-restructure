import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-well-tree-list',
  templateUrl: './well-tree-list.component.html',
  styleUrls: ['./well-tree-list.component.scss']
})
export class WellTreeListComponent {
  searchObjC:any;
  @Output() searchStr: EventEmitter<string> = new EventEmitter();
  userSearchChange(obj:any){
    this.searchObjC = obj;
    this.searchStr.emit(this.searchObjC.searchText);
  }


}
