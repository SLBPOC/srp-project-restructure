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
  constructor(private authorizationService: AuthorizationService) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if ((this.authorizationService.hasAccessToken && !this.authorizationService.validAccessTokens().length) ||
        !this.authorizationService.hasAccessToken
    ) {
      alert('Invalid access token... redirecting')
      this.authorizationService.authorize();
    }
    if (this.authorizationService.hasAccessToken) {
      const validAccessTokenLength = this.authorizationService.validAccessTokens().length;
      // console.log('==> valid access tokens:- ', this.authorizationService.validAccessTokens());
      return validAccessTokenLength > 0;
    } else {
      alert('Token missing.. redirecting')
      this.authorizationService.authorize();
      return false;
    }
  }


  // api request token authorization

}
