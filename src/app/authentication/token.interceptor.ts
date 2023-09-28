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

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Authorization token ${token}` }
      });
    } else {
      // after the callback
      const params = this.activatedRoute.snapshot.queryParamMap;
        if(!params.get('code')) {
          // alert('Token/Code missing, redirecting ...')
          this.authorizationService.authorize();
        }
    }
    
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('==>err', err);
        if (err instanceof HttpErrorResponse) {

          if (err.status === 404) {
            alert('Request failed (status code: 404)')
          }
          if (err.status === 401) {
            // redirect user to the logout page
          }
        }
        return throwError(err);
      })
    )

  }
}
