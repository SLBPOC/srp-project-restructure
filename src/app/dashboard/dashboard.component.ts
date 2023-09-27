import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchObjC:any;

  constructor() {
    console.log('==> dashboard component loaded');
  }
  userSearchChange(obj:any){
    this.searchObjC = obj;
  }
}
