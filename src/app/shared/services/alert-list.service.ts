import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertList } from '../models/alert-list';
import { environment } from 'src/environments/environment.development';
import { EventList } from '../models/event-list';

@Injectable({
  providedIn: 'root'
})
export class AlertListService {
  baseUrl: string = environment.srp_microservice_url;
  _apiUrl: string = 'https://localhost:59475/';

  constructor(private http: HttpClient) {}
   // getWellAlerts(): Observable<AlertList[]> {
  //   return this.http.get<AlertList[]>(alertsData);
  // }

  getWellAlerts(): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions);
    return this.http.get<Observable<AlertList[]>>(
      `${this.baseUrl}Alerts/GetAllWellList`
    );
  }

  getAlertsByAlertStatus(alertStatus: string): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions);
    return this.http.get<any>(
      `${this.baseUrl}Alerts/GetWellAlertsByAlertStatus?AlertStatus=${alertStatus}`
    );
  }

  getAlertListFilters(payload: any): Observable<any> {
    const url = `${this.baseUrl}Alerts/Get`;
    return this.http.post(url, payload, {
      headers: {},
    });
  }

  getAlertList(payload: any): Observable<any> {
    return this.http.post<AlertList[]>(`${this.baseUrl}Alerts/Get`,payload);
  }

  getSnoozeByWellName(wellName: string) {
    return this.http.post<any>(`${this.baseUrl}Alerts/GetSnoozbyWells?wellId=${wellName}`,wellName);
  }

  getDefaultAlertCategory(payload?: any): Observable<any> {
    return this.http.post<AlertList[]>(`${this.baseUrl}Alerts/GetDefaultValues`,payload);
  }

  getDefaultEventCategory(payload?: any): Observable<any> {
    return this.http.post<EventList[]>(this.baseUrl + 'api/Event/Get', payload);
  }

  clearAlert(id: number, comments: string, payload?: any): Observable<any> {
    return this.http.post<AlertList[]>(`${this.baseUrl}Alerts/ClearAlert?alertId=${id}&comment=${comments}`,payload);
  }

  snoozeBy(id: number, time: number, payload?: any): Observable<any> {
    return this.http.post<AlertList[]>(`${this.baseUrl}Alerts/SnoozeBy?alertId=${id}&snoozeBy=${time}`,payload);
  }

}
