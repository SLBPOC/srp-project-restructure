import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WellsService } from '../../../shared/services/wells.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-well-info',
  templateUrl: './well-info.component.html',
  styleUrls: ['./well-info.component.scss']
})
export class WellInfoComponent implements OnInit{

  dynacardSummaryData: {label: string, value: string}[] = [
    {label: 'Current SPM ', value: '5.5 spm'},
    {label: 'Pump Fillage', value: '94.5'},
    {label: 'Well State', value: 'Pumping Normal State'},
    {label: 'Pump Card DiagnisStics ', value: 'Narmal'},
    {label: 'inferred prod', value: '278.0 bbls/day'},

  ]; 
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private ac: ActivatedRoute, private service: WellsService) {
  }

  currentWellId: any;
  dataResult: any;
  enabled: Boolean = false

  createCustomFeed(){
    console.warn("@");
    this.enabled = true
  }

  ngOnInit(): void {
    this.currentWellId = this.ac.snapshot.params['id'];
    this.getWellInfoById();
  }

  getWellInfoById() {
    console.log('getWellInfoById', this.currentWellId)
    this.service.getWellInfoById(this.currentWellId).subscribe((data: any) => {
      this.dataResult = data;
      console.log('well info:- ', this.dataResult)

    })

  }
}
