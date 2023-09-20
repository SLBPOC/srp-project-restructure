import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-custom-feed',
  templateUrl: './create-custom-feed.component.html',
  styleUrls: ['./create-custom-feed.component.scss']
})
export class CreateCustomFeedComponent {

  // @Input() isEnable : Boolean;

  constructor(public dialogRef: MatDialogRef<CreateCustomFeedComponent>){

  }
  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  createFeed(){
    // this.isEnable = false
    this.dialogRef.close();
  }


}
