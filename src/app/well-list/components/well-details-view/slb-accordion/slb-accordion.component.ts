import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';




@Component({
  selector: 'app-slb-accordion',
  templateUrl: './slb-accordion.component.html',
  styleUrls: ['./slb-accordion.component.scss'],
  
  
})
export class SlbAccordionComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  myButton() {
    console.log("my button was clicked!");
  }

}
