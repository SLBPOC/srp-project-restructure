import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders
 } from '@angular/common/http';
import { EventList } from '../model/event-list';
import { Observable, map, tap } from 'rxjs';
import { SLBSearchParams, SortOptions } from 'src/app/models/slb-params';

const eventsData = '../../../../assets/json/events-data.json';

@Injectable({
  providedIn: 'root',
})
export class EventListService {
  private apiUrl: string="http://localhost:61209/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {}


  getWellEventfromDB(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "Event", this.httpOptions);          
  }

  getWellEvents(params: SLBSearchParams): Observable<EventList[]> {
    //when you get api call this
    //return this.http.post<AlertList[]>("url", params);
    //this is local setup
    //var eventList= this.http.get<any[]>(this.apiUrl + "Event", this.httpOptions);  
    return this.http.get<any[]>(this.apiUrl + "Event", this.httpOptions).pipe(
      map((x) => {
        return this.filterData(params, x);
      })
    );
  }
  filterData(params: SLBSearchParams, res: EventList[]): EventList[] {
    if (params.searchTerm) {
      res = res.filter(
        (x) =>
          x.wellName.toLowerCase().includes(params.searchTerm.toLowerCase()) ||
          x.eventDescription.toLowerCase().includes(params.searchTerm.toLowerCase())  // ||
          // x.eventType.toLowerCase().includes(params.searchTerm.toLowerCase()) ||
          // x.eventStatus.toLowerCase().includes(params.searchTerm.toLowerCase())
      );
    }
    if (params.sort && params.sort.active) {
      res = this.transform(res, params.sort);
    }
    if (params.params && params.params.size > 0) {
      params.params.forEach((value, key) => {
        if (key == 'eventType') {
          res = res.filter(
            (c) => c.priority.toLowerCase() == value?.toLowerCase()
          );
        }
        // if (key == 'status') {
        //   res = res.filter(
        //     (c) => c.status.toLowerCase() == value?.toLowerCase()
        //   );
        // }
        if (key == 'dateRange') {
          let dates = value.split('$');
          let start = dates[0],
            end = dates[1];
          res = res.filter(
            (c) =>
              new Date(c.creationDateTime).getTime() >= new Date(start).getTime() &&
              new Date(c.creationDateTime).getTime() <= new Date(end).getTime()
          );
        }
      });
    }
    return res;
  }
  transform(values: any[], sort: SortOptions): any[] {
    return values.sort((a, b) => {
      if (sort.direction == 'desc') {
        if (a[sort.active] < b[sort.active]) return 1;
        if (a[sort.active] > b[sort.active]) return -1;
      } else if (sort.direction == 'asc') {
        if (a[sort.active] < b[sort.active]) return -1;
        if (a[sort.active] > b[sort.active]) return 1;
      }
      return 0;
    }); //a[sort.active].localeCompare(b[sort.active]));
  }
}
