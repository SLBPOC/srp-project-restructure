import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-algomit-filtertabs',
  templateUrl: './algomit-filtertabs.component.html',
  styleUrls: ['./algomit-filtertabs.component.scss']
})
export class AlgomitFiltertabsComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  myButton() {
    console.log("my button was clicked!");
  }
}
