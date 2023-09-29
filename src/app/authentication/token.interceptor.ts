import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, of } from 'rxjs';
import { AuthorizationService } from './services/authorization.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public error: string | null = null;

  constructor(private authorizationService: AuthorizationService, private activatedRoute: ActivatedRoute) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authorizationService.accessToken?.access_token;

    // if (token) {
    //   request = request.clone({
    //     setHeaders: { Authorization: `Authorization token ${token}` }
    //   });
    // } else {
    //   const params = this.activatedRoute.snapshot.queryParamMap;
    //     if(!params.get('code')) {
    //       this.authorizationService.authorize();
    //     }
    // }

    if (token && this.authorizationService.validAccessTokens()) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    } else {
      console.log('==> token missing');
      const params = this.activatedRoute.snapshot.queryParamMap;
        if(!params.get('code')) {
          this.authorizationService.authorize();
        }
    }

    
    return next.handle(request).pipe(
      catchError((err) => {
        // console.log('==>err', err);
        if (err instanceof HttpErrorResponse) {
          let errMsg = `Request failed!!! status code ${err.status}`;

          switch (err.status) {
            case 401:
              // alert(errMsg);
              console.log(errMsg);
              // rediect to logout page
              break;
          
              case 404:
              // alert(errMsg);
              console.log(errMsg);
              // rediect to page not found page
              break;

            default:
              break;
          }
        }
        return throwError(() => err);
      })
    )

  }
}
