import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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

  wellListDataJSON = '../../../../assets/json/well-list-by-filters.json'
  wellListDefaultValueJSON = '../../../../assets/json/well-list-default-value.json'
  wellListFilterSortDropdownsJSON = '../../../../assets/json/well-list-filter-sort-dropdowns.json'

  constructor(private http: HttpClient) { }


  getWellDetails(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "well", this.httpOptions);
  }

  getWellDetailsWithFilters(searchModel: any): Observable<any> {
    return this.http.get(this.wellListDataJSON);
    return this.http.post<any[]>(this.apiUrl + "Well/GetWellListByFilters", searchModel, this.httpOptions);
  }

  GetWellFilterDefaultValues(): Observable<any> {
    return this.http.get(this.wellListDefaultValueJSON)
    return this.http.post<any[]>(this.apiUrl + "Well/GetWellFilterDefaulValues", this.httpOptions);  
  }

  getWellInfoById(wellId: string): Observable<any> {
    // return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById/${wellId}`, this.httpOptions); 
    return this.http.get<any>(this.apiUrl + `Well/GetWellInfoById?WellId=${wellId}`)
  }

  getWellListFilterSortDropdowns(): Observable<any> {
    return this.http.get(this.wellListFilterSortDropdownsJSON);
  }
}
