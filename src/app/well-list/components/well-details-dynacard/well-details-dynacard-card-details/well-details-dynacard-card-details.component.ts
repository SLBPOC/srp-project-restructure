import { Component } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { DynacardService } from '../../../services/dynacard.service';
import { CardDetailsModel } from '../../../model/dyna-card.model';
interface welldata {
  value: number;
  viewValue: string;
}
// export interface PeriodicElement {
//   select: string;
//   card: string;
//   time: string;
//   Minimum_Polished_Rod_Load: string;
//   Peak_Polished_Rod: string;
// }



@Component({
  selector: 'app-well-details-dynacard-card-details',
  templateUrl: './well-details-dynacard-card-details.component.html',
  styleUrls: ['./well-details-dynacard-card-details.component.scss']
})
export class WellDetailsDynacardCardDetailsComponent {

  selectedTimeDetails: CardDetailsModel = new CardDetailsModel();;

  mappingOfFields = {
    pumpFillage_per: 'Pump Fillage(%) ',
    SPM: 'SPM',
    minPolishedRodLoad_lbs: 'Min.Polished Rod Load(lbs)',
    peakPolishedRodLoad_lbs: 'Peak Polished Rod Load(lbs)',
    surfaceStrokeLength_in: 'Surface Stroke Length (in)',
    downholeStrokeLength_in: 'Downhole Stroke Length (in)',
    totalFluid_in: 'Total Fluid (in)',
  };

  constructor(private dynaService: DynacardService) {
    this.dynaService.selectedTime.subscribe(x => {
      if (x.addedOrRemoved) {
        this.dynaService.getDetailsAboutTime(x.selected).subscribe(y => {
          this.selectedTimeDetails = y;
        });
      }
      else {
        this.selectedTimeDetails = new CardDetailsModel();
      }
    });
    this.dynaService.selectedTimeInGraph.subscribe(x => {
      if (x != undefined && x != '')
        this.dynaService.getDetailsAboutTime(x).subscribe(y => {
          this.selectedTimeDetails = y;
        });
    })
  }

  welldata: welldata[] = [
    { value: 1, viewValue: 'Pump Tagging' },
    { value: 2, viewValue: 'Last Storke Card' },
    { value: 3, viewValue: 'Distorted' },
    { value: 4, viewValue: 'Flatlining' },
    { value: 5, viewValue: 'Fluid Pound' },
    { value: 6, viewValue: 'Gas Interference' },
    { value: 7, viewValue: 'High Fluid Level' },
    { value: 8, viewValue: 'Very High Fluid Level' },
    { value: 9, viewValue: 'Other' },
  ];

  // dynacardSummaryData: {label: string, value: string}[] = [
  // {label: 'Pump Fillage(%) ', value: '50%'},
  // {label: 'SPM', value: '50.0'},
  // {label: 'Min.Polished Rod Load(lbs)', value: '17.829 lbs'},
  // {label: 'Peak Polished Rod Load(lbs)', value: '30.314 lbs'},
  // {label: 'Surface Stroke Length (in)', value: '0.00 sec'},
  // {label: 'Downhole Stroke Length (in)', value: '2.299'},
  // {label: 'Total Fluid (in)', value: '100.00'},

  // ]; 
  // jsonData = [
  //   { label: 'Pump Tagging', value: '50%' },
  //   { label: 'Last Storke Card', value: 'Last Storke Card' },
  //   { label: 'Flatlining', value: 'Flatlining' },
  //   { label: 'Fluid Pound', value: 'Fluid Pound' },
  //   { label: 'Gas Interference', value: 'Gas Interference' },
  // ];
  // selectedValue: string = '';


  // onSelect(event: any) {
  //   this.selectedValue = event.target.value;
  // }


}
