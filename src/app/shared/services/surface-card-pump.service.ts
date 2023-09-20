import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurfaceCardPumpService {
  
  constructor(private http: HttpClient) { }
  private surfacecardJson = '../../../../assets/json/surface-card-pump.json';
  surfaceChartData(): Observable<any> {
    return this.http.get(this.surfacecardJson)
  }

  private pumpChartJson = '../../../../assets/json/pump-filledchart.json';
  getpumfillageChartData(): Observable<any> {
    return this.http.get(this.pumpChartJson)
  }

}
