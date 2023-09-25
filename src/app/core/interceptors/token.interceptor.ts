import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, of } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
// import { LoginService } from '@agora/agora-ui-library';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accessToken: any;
  public error: string | null = null;

  constructor(private authorizationService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.accessToken = this.loginService.getAccessToken();
    this.accessToken = this.authorizationService.accessToken?.access_token;
    // const isSauthTokenRequest = request.url.includes('/token') || request.url.includes('/getconfigurations');
    // console.log('==> current access token', this.authorizationService.accessToken?.access_token);
    // if (this.accessToken && !isSauthTokenRequest) {
      if (this.accessToken) {

      request = request.clone({
        setHeaders: { 'Authorization': `Bearer ${this.accessToken}` },
      });
      // console.log('==> intercept, token added, request object',request)
    }
    return next.handle(request)
    .pipe(

      // catchError(err => {
      //   if (err instanceof HttpErrorResponse) {
      //     if (err.status === 401) {
      //       this.loginService.authorize();
      //     }
      //   }
      //   return throwError(() => err);
      // })

      // catchError modified below
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          // if(err.status === 401) {
          //   this.authorizationService.authorize();
          // }
          // if(err.status === 500) {
          //   console.log('internal server error.')
          // }
          if (!!this.authorizationService.accessToken) {
            this.authorizationService.removeAccessToken(this.authorizationService.accessToken);
            // this.authorizationService.authorize();
          }
          this.authorizationService.accessToken = null;
        }
        return throwError(() => err);
      })
    );
  }
}
