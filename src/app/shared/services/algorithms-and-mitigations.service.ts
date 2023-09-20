import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {filter, tap} from 'rxjs/operators'
import { BubbleChartInfo, ClassficationInfo } from '../models/dyna-card.model';

@Injectable({
  providedIn: 'root'
})

export class AlgorithmsAndMitigationsService {

  private apiUrl: string="http://localhost:5000/api/";
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };


  private controllersSelectOptions = '../../../../assets/json/controllers.json';
  private agorithmsAndMitigationsFilterDataJson = '../../../../assets/json/algo-mit-filter-data.json';
  private tagSelectOptions = '../../../../assets/json/tags.json';
  private tagDetails = '../../../../assets/json/tag-data.json';
  private algoLineChartJson = '../../../../assets/json/algo-line-chart.json';
  private applyTagUrl = 'http://10.17.12.1:9090/api/v1/applyTags';
  private saveTagsUrl = 'http://10.17.12.1:9090/api/v1/saveTags';
  private refreshTagsJson = 'http://10.17.12.1:9090/api/v1/refreshTags';
  private networkTagsJson = 'http://10.17.12.1:9090/api/v1/networkTags';
  private syncTagsJson = 'http://10.17.12.1:9090/api/v1/syncTags';
  private algorithmsAndMitigationsFilterJson = 'http://10.17.12.1:9090/api/v1/applyAlgoFilter';
  private scatterChartDataJson = '../../../../assets/json/scatter-chart-data.json';
  private bubbleChartDataJson = '../../../../assets/json/bubble-chart-data.json';
  private scatterChartInfoJson = '../../../../assets/json/scatter-chart-info.json';
  // private wellInfoJson = '../../../../assets/json/well-info.json';
  private wellInfoJson = 'http://localhost:5000/api/Well/GetWellInfoById?WellId=';
  private heatMapChartJson = '../../../../assets/json/heat-map-chart.json';


  constructor(private http: HttpClient) { }

  getControllerSelectOptionsData(): Observable<any>{
    return this.http.get(this.controllersSelectOptions);
  }

  getTagSelectOptions(): Observable<any>{
    return this.http.get(this.tagSelectOptions);
  }

  getTagsData(): Observable<any>{
    return this.http.get(this.tagDetails);
  }

  applyTags(payload: any): Observable<any> {
    return this.http.post(this.applyTagUrl, payload, {
        headers: {
        }
    })
  }

  saveTags(payload: any): Observable<any> {
    return this.http.post(this.saveTagsUrl, payload, {
        headers: {
        }
    })
  }

  refreshTags(payload: any): Observable<any> {
    return this.http.post(this.refreshTagsJson, payload, {
        headers: {
        }
    })
  }
  
  networkTags(payload: any): Observable<any> {
    return this.http.post(this.networkTagsJson, payload, {
        headers: {
        }
    })
  }

  syncTags(payload: any): Observable<any> {
    return this.http.post(this.syncTagsJson, payload, {
        headers: {
        }
    })
  }
  getAlgorithmsAndMitigationsChartData(): Observable<any> {
    return this.http.get(this.algoLineChartJson)
  }
  
  setAlgoMitFilter(payload: any): Observable<any> {
    return this.http.post(this.algorithmsAndMitigationsFilterJson, payload, {
      headers: {
      }
  })
  }

  getAlgoMitFilterData(): Observable<any> {
    return this.http.get(this.agorithmsAndMitigationsFilterDataJson)
  }

  getScatterChartData(): Observable<any>{
    return this.http.get(this.scatterChartDataJson);
  }

  getBubbleChartData(): Observable<any>{
    return this.http.get(this.bubbleChartDataJson);
  }

  getBubbleChartDataV2(start:any,end:any):Observable<BubbleChartInfo>{
    var url = this.apiUrl + `dynameter/classifications/from/${start.toISOString()}/to/${end.toISOString()}/chart`
    return this.http.get<BubbleChartInfo>(url);
  }

  getChartInfo(): Observable<ClassficationInfo[]> {
    return this.http.get<ClassficationInfo[]>(this.scatterChartInfoJson);
  }

  // getWellInfoById(wellId: string): Observable<any> {
  //   return this.http.get(this.wellInfoJson + wellId)
  // }

  getWellInfoById(wellId: string): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions); 
    return this.http.get<any>  (`http://localhost:5000/api/Well/GetWellInfoById?WellId=${wellId}`)       
  }

  getHeatMapChartData() {
    return this.http.get(this.heatMapChartJson)

  }

}
