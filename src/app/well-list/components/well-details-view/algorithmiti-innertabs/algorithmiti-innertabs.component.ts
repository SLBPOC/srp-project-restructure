import { Component, EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-algorithmiti-innertabs',
  templateUrl: './algorithmiti-innertabs.component.html',
  styleUrls: ['./algorithmiti-innertabs.component.scss']
})
export class AlgorithmitiInnertabsComponent {


  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

}
