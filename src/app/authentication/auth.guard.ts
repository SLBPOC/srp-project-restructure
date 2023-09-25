import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authorizationService: AuthorizationService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authorizationService.hasAccessToken) {
      const validTokens = this.authorizationService.validAccessTokens();
      console.log('==> valid access tokens:- ', this.authorizationService.validAccessTokens());
      return this.authorizationService.validAccessTokens().length > 0;
    } else {
      console.log('access token not found, authorizing')
      this.authorizationService.authorize();
      return false;
    }
  }


  // api request token authorization
  
}
