import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertList } from '../models/alert-list';

@Injectable({
  providedIn: 'root'
})
export class AlertListService {

  constructor(private http: HttpClient) { }

  getWellAlerts(): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions); 
    return this.http.get<Observable<AlertList[]>> (`http://localhost:5000/api/Alerts/GetAllWellList`)       
  }

  getAlertsByAlertStatus(alertStatus: string): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions); 
    return this.http.get<any>  (`http://localhost:5000/api/Alerts/GetWellAlertsByAlertStatus?AlertStatus=${alertStatus}`)       
  }

  getAlertListFilters(payload: any): Observable<any> {
    const url = `http://localhost:5000/api/Alerts/GetAlertList`;
    return this.http.post(url, payload, {
      headers: {}
    })
  }

  clearAlert(payload: any): Observable<any> {
    const url = `http://localhost:5000/api/Alerts/ClearAlert`;
    console.log(payload)
    return this.http.post(url, null, {
      params: payload,
    })
  }

  snoozeBy(payload: any): Observable<any> {
    const url = `http://localhost:5000/api/Alerts/SnoozeBy`;
    console.log(payload)
    return this.http.post(url, null, {
      params: payload
    })
  }

}
