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
  private validAccessToken: any = this.authorizationService.hasAccessToken && this.authorizationService.validAccessTokens().length > 0;
  constructor(private authorizationService: AuthorizationService) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if(this.validAccessToken) {
      return true;
    } else {
      console.log("==> Auth token missing, redirecting");
      // alert('Auth Token missing, redirecting ...')
      this.authorizationService.authorize();
      return false;
    }
  }

}
