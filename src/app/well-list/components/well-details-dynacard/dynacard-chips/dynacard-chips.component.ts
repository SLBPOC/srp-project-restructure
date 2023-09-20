import { Component } from '@angular/core';

@Component({
  selector: 'app-dynacard-chips',
  templateUrl: './dynacard-chips.component.html',
  styleUrls: ['./dynacard-chips.component.scss']
})
export class DynacardChipsComponent {  
  dynacardSummaryData: {label: string, value: string}[] = [
    {label: 'Puming Status ', value: 'Running'},
    {label: 'Comm Status', value: 'Comm Established'},
    {label: 'Data Quality', value: 'ShutDown'},
    // {label: 'Puming Status ', value: 'Running'},
    // {label: 'Comm Status', value: 'Comm Established'},
    // {label: 'Data Quality', value: 'ShutDown'},

   
  ]; 
}
