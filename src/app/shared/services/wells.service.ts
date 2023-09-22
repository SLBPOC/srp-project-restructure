import { Injectable } from '@angular/core';
//import { WellName } from '../model/wellname';
//import { WellModel } from '../model/wellModel';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Subject } from 'rxjs';
import { NodeType, WellHierarchyResult } from '../models/models';
import { environment } from 'src/environments/environment.development';

const wellData = '../../assets/json-data/welllist-data.json';

@Injectable({
  providedIn: 'root'
})
export class WellsService {
  sub = new Subject()
  private apiUrl: string = environment.srp_microservice_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  wellListData = '../../../../assets/json/well-list-by-filters.json'
  wellListFilterSortDropdowns = '../../../../assets/json/well-list-filter-sort-dropdowns.json'

  constructor(private http: HttpClient) { }


  getWellDetails(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "well", this.httpOptions);
  }

  getWellDetailsWithFilters(searchModel: any): Observable<any> {
    //return this.http.get(this.wellListData);
    return this.http.post<any[]>(this.apiUrl + "Well/Get", searchModel, this.httpOptions);
  }

  GetWellFilterDefaultValues(): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + "Well/GetDefaultValues", this.httpOptions);  
  }

  getWellInfoById(wellId: string): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions); 
    return this.http.get<any>(this.apiUrl + `WellInfo/Get?WellId=${wellId}`)
  }

  getWellListFilterSortDropdowns(): Observable<any> {
    return this.http.get(this.wellListFilterSortDropdowns);
  }
  getWellHierarchy(): Observable<WellHierarchyResult> {
    return this.http.get<WellHierarchyResult>(this.apiUrl + "Well/hierarchy");
  }
  searchWellHierarch(searchText: string, searchLevels: NodeType[]): Observable<WellHierarchyResult> {
    return this.http.get<WellHierarchyResult>(this.apiUrl + `Well/hierarchy?SearchText=${searchText}&SearchLevels=${searchLevels.join("&SearchLevels=")}`  )
  }
}