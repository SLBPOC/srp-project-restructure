import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-well-details-dynacard',
  templateUrl: './well-details-dynacard.component.html',
  styleUrls: ['./well-details-dynacard.component.scss']
})
export class WellDetailsDynacardComponent {
  submitted: boolean = false;  


  // dynacardSummaryData: {label: string, value: string}[] = [
  //   {label: 'Puming Status ', value: 'Running'},
  //   {label: 'Comm Status', value: 'Comm Established'},
  //   {label: 'Data Quality', value: 'ShutDown'},
  //   {label: 'Device ID', value: 'DP_ApachesSRP 402_AltTest'},
  //   {label: 'Last Transmission', value: '2023-06-21 13:14:59 UTC'},
  //   {label: 'Last Heartbeat', value: '2023-06-21 13:14:59 UTC'}
  // ]; 
   
  ngOnInit(): void {
  }

  onSubmit() {
  
 }


 
}
