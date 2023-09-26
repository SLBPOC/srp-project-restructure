import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlgorithmsAndMitigationsService } from '../../../shared/services/algorithms-and-mitigations.service';

@Component({
  selector: 'app-well-info-image-description',
  templateUrl: './well-info-image-description.component.html',
  styleUrls: ['./well-info-image-description.component.scss']
})
export class WellInfoImageDescriptionComponent implements OnInit, OnChanges {
  dataResult: any;
  @Input() wellId: any;

  constructor(private service: AlgorithmsAndMitigationsService) { }

  ngOnInit(): void {

    this.getWellInfoById(this.wellId);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  getWellInfoById(wellId: any) {
    this.service.getWellInfoById(wellId).subscribe((data: any) => {
      this.dataResult = data;
    })
  }

}