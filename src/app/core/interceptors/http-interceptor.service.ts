import { Injectable } from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ErrorService } from "./error.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router,private errorService:ErrorService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.addError(error.message);
        return throwError(error);
      })
    );
  }
}