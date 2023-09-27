import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, of } from 'rxjs';
import { AuthorizationService } from './services/authorization.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accessToken: any;
  public error: string | null = null;

  constructor(private authorizationService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accessToken = this.authorizationService.accessToken?.access_token;
      if (this.accessToken) {
      request = request.clone({
        setHeaders: { 'Authorization': `Bearer ${this.accessToken}` },
      });
    }
    return next.handle(request)
    .pipe(
      catchError(err => {
        if(this.authorizationService.hasAccessToken) {

          if(err instanceof HttpErrorResponse) {
          let errMessage: string = 'Request failed. (' + err.status + ')';
            // switch (err.status) {
            //   case 404: 
            //     break;

            //   case 500:
            //     break;
            
            //   case 400: 
            //     break;

            //   default: 
            //     break;
            // }
            alert(errMessage);
          }
        } else {
          alert('Token missing. redirecting...');
          this.authorizationService.authorize();
        }
        return throwError(() => err);
      })
    );
  }
}
