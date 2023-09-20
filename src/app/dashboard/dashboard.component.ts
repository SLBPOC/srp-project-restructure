import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchObjC:any;
  userSearchChange(obj:any){
    this.searchObjC = obj;
  }
}
