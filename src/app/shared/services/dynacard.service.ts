import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { CardDetailsModel, DynacardModel2, FramesDynameter } from '../models/dyna-card.model';

@Injectable()
export class DynacardService {

  baseUrl: string = "http://localhost:5000/api/";

  listOfTime: string = "Dynacard/GetDynacardTimeRange";

  detailsForATime = "dynameter/timeframes/";

  selectedTime: Subject<any> = new Subject();

  selectedTimeInGraph = new Subject<string>();

  selectedClassification: Subject<any> = new Subject();

  constructor(private client: HttpClient) { }

  getListOfTime(classfication: string, startDate: string, endDate: string): Observable<FramesDynameter[]> {
    var url = this.baseUrl + `dynameter/classfications/${classfication}/timeframes/from/${startDate}/to/${endDate}`;
    return this.client.get<FramesDynameter[]>(url);
  }

  getDynaCardDetailsForATime(time: string): Observable<DynacardModel2[]> {
    var url = this.baseUrl + this.detailsForATime + time;
    return this.client.get<DynacardModel2[]>(url);
  }

  getDetailsAboutTime(time: string): Observable<CardDetailsModel> {
    var url = '../../../../assets/json/card-details-dyncard.json';
    return this.client.get<CardDetailsModel[]>(url).pipe(
      map<CardDetailsModel[], CardDetailsModel>((x: any) => x.find((y: any) => {console.log((new Date(y.id)).toISOString().replace(".000Z",""),time);return (new Date(y.id)).toISOString().replace(".000Z","") == time}))
    )
  }
}
