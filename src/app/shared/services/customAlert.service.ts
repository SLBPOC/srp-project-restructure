import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { customAlert } from '../models/customAlert';


@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
    
  constructor(private http: HttpClient) { 
    this.apiUrl=environment.srp_microservice_url;
  }

  addCustomAlert(customAlert:customAlert):Observable<any>{
    return this.http.post<customAlert>(this.apiUrl + 'CustomAlert/create', customAlert,this.httpOptions);
  }

  EditCustomAlert(customAlert:customAlert):Observable<any>{
    return this.http.put<customAlert>(this.apiUrl + 'CustomAlert/Update', customAlert,this.httpOptions);
  }

  displayDetails(searchModel:any):Observable<any>{
    return this.http.post<customAlert[]>(this.apiUrl + 'CustomAlert', searchModel,this.httpOptions);
  }

  deleteCustomAlert(id:number):Observable<customAlert>{
    return this.http.delete<customAlert>(this.apiUrl + 'CustomAlert?Id=' + id);
  }

  isActiveCustomAlert(id:number,IsActive:boolean):Observable<customAlert>{
    return this.http.put<customAlert>(this.apiUrl + 'CustomAlert?Id=' + id +'&IsActive='+ IsActive,"");
  }

 
}