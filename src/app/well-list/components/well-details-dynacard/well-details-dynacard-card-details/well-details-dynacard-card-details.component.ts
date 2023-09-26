import { Component } from '@angular/core';
import { DynacardService } from '../../../../shared/services/dynacard.service';
import { CardDetailsModel } from 'src/app/shared/models/dyna-card.model';

interface welldata {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-well-details-dynacard-card-details',
  templateUrl: './well-details-dynacard-card-details.component.html',
  styleUrls: ['./well-details-dynacard-card-details.component.scss']
})
export class WellDetailsDynacardCardDetailsComponent {
  selectedTimeDetails: CardDetailsModel | null = null;
  mappingOfFields = {
    pumpFillage_per: 'Pump Fillage(%) ',
    SPM: 'SPM',
    minPolishedRodLoad_lbs: 'Min.Polished Rod Load(lbs)',
    peakPolishedRodLoad_lbs: 'Peak Polished Rod Load(lbs)',
    surfaceStrokeLength_in: 'Surface Stroke Length (in)',
    downholeStrokeLength_in: 'Downhole Stroke Length (in)',
    totalFluid_in: 'Total Fluid (in)',
  } as any;

  constructor(private dynaService: DynacardService) {
    this.dynaService.selectedTime.subscribe(x => {
      if (x.addedOrRemoved) {
        this.dynaService.getDetailsAboutTime(x.selected).subscribe(y => {
          this.selectedTimeDetails = y;
        });
      }
      else {
        this.selectedTimeDetails = null;
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

}