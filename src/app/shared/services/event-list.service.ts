import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders
 } from '@angular/common/http';
import { EventList } from '../models/event-list';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventListService {
  // private apiUrl: string = environment.srp_microservice_url;
  private _apiUrl: string = environment.srp_microservice_url;

  // _apiUrl: string = 'https://localhost:52906/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // getWellAlerts(): Observable<AlertList[]> {
  //   return this.http.get<AlertList[]>(alertsData);
  // }

  getWellEvents(): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions);
    return this.http.get<Observable<EventList[]>>(
      `${this._apiUrl}Events/GetAllWellList`
    );
  }

  getEventList(SearchModel: any): Observable<any> {
    return this.http.post<EventList[]>(this._apiUrl + 'Event/Get', SearchModel);
  }

  getDefaultEvents(payload?: null): Observable<any> {
    return this.http.post<EventList[]>(
      this._apiUrl + 'Event/GetDefaultValues',
      payload
    );
  }

  clearAlert(id: number, comments: string, payload?: any): Observable<any> {
    return this.http.post<EventList[]>(
      this._apiUrl + `api/Alerts/ClearAlert?alertId=${id}&comment=${comments}`,
      payload
    );
  }

  snoozeBy(id: number, time: number, payload?: any): Observable<any> {
    return this.http.post<EventList[]>(
      this._apiUrl + `api/Alerts/SnoozeBy?alertId=${id}&snoozeBy=${time}`,
      payload
    );
  }
}

