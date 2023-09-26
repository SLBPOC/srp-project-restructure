import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccessToken } from '../models/access_token';
import { AccessTokens } from '../models/access_tokens';
import { AuthorizationResponse } from '../models/authorization-response';
import { ExchangeResponse } from '../models/exchange-response';
import { Pkce } from '../models/pkce';
import { PkceService } from './pkce.service';
import { StateService } from './state.service';

@Injectable()
export class AuthorizationService {
  private clientId: string = 'd20825d2c17efc0b42908d0078b78eab';
  // private subscriptionKey: string = '<SKY_API_SUBSCRIPTION_KEY>';
  private redirectUri: string = 'http://localhost:4200/Callback';
  private authorizationUrl: string = 'https://p4d.csi.cloud.slb-ds.com/v2/auth?';
  private tokenUrl: string = 'https://p4d.csi.cloud.slb-ds.com/v2/token';
  // private redirectUri: string = 'https://evd.srp.cloud.slb-ds.com/Callback';


  constructor(
    private httpClient: HttpClient,
    private pkceService: PkceService,
    private stateService: StateService
  ) {}

  public authorize(): void {
    this.accessToken = null;
    const pkce = this.pkceService.getPkce();
    const state = this.stateService.getState(40);

    localStorage.setItem(state, pkce.verifier);
    this.getAuthorizationUrl(state, pkce);
    (window as any).location.href = this.getAuthorizationUrl(state, pkce);
  }

  private getAuthorizationUrl(state: string, pkce: Pkce): string {
    const params = this.getAuthorizationParams(state, pkce);
    console.log('==> Authorization url:- ', this.authorizationUrl + params.toString())
    // return `https://p4d.csi.cloud.slb-ds.com/v2/auth?${params.toString()}`;
    return this.authorizationUrl + params.toString()
  }

  private getAuthorizationParams(state: string, pkce: Pkce): HttpParams {
    const params = {
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: state,
      code_challenge_method: pkce.method,
      code_challenge: pkce.challenge,
    };    
    return new HttpParams({
      fromObject: params,
    });
  }

  // public get skyApiHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${this.accessToken?.access_token}`,
  //     'Bb-Api-Subscription-Key': this.subscriptionKey,
  //   });
  // }

  public get accessTokens(): AccessTokens {
    const accessTokenString: string | null =
      localStorage.getItem('access_tokens');

    const accessTokens: AccessTokens = !accessTokenString
      ? { tokens: [] }
      : (JSON.parse(accessTokenString) as AccessTokens);

    return accessTokens;
  }

  public set accessTokens(value: AccessTokens | null) {
    if (!value) {
      localStorage.removeItem('access_tokens');
    } else {
      localStorage.setItem('access_tokens', JSON.stringify(value));
    }
  }

  public validAccessTokens(): AccessToken[] {
    
    const validTokens = this.accessTokens.tokens.filter(
      (token) => token.expires > new Date().toUTCString()
    );
    console.log('==> Current validAccessTokens', validTokens);
    return validTokens;
    // modified logic below
    // return this.accessTokens.tokens.filter(
    //   (token) => new Date(token?.expires + '').getTime() > Date.now()
    // )
  }

  public addAccessToken(exchangeResponse: ExchangeResponse): void {
    if (!exchangeResponse || exchangeResponse.access_token.length === 0) {
      return;
    }

    let expires = new Date();
    expires.setSeconds(expires.getSeconds() + exchangeResponse.expires_in);

    let accesssTokens: AccessTokens = this.accessTokens?.tokens
      ? this.accessTokens
      : { tokens: [] };
      
    const token = {
      access_token: exchangeResponse.access_token,
      state: exchangeResponse.state,
      expires: expires.toUTCString(),
      environment_name: exchangeResponse.environment_name,
    };

    accesssTokens.tokens.push(token);

    this.accessTokens = accesssTokens;
    this.accessToken = token;
  }

  public removeAccessToken(token: AccessToken): void {
    let cached = this.accessTokens;

    if (!cached) {
      return;
    }

    const idx = cached.tokens.indexOf(token);
    if (idx > -1) {
      cached.tokens = cached.tokens.splice(idx, 1);
      this.accessTokens = cached;
    }
  }

  public get accessToken(): AccessToken | null {
    const cachedToken = localStorage.getItem('access_token');
    if (!cachedToken) {
      return null;
    }

    const parsedToken = JSON.parse(cachedToken);

    if (parsedToken.expires <= new Date()) {
      this.removeAccessToken(parsedToken);
      this.accessToken = null;
      return null;
    }

    return parsedToken;
  }
  // public removeAccessTokens() {
  //   this.accessTokens.tokens.forEach((token) => this.removeAccessToken(token))

  // }
  public set accessToken(value: AccessToken | null) {
    if (!value?.access_token) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', JSON.stringify(value));
    }
  }

  public get hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  public removeState(state: string): void {
    localStorage.removeItem(state);
  }

  public exchangeAuthorizationCode(
    authorizationResponse: AuthorizationResponse
  ): Observable<ExchangeResponse> {
    const verifier = localStorage.getItem(authorizationResponse.state);

    if (!verifier) {
      throw 'Could not get verifier from local storage using the state';
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code: authorizationResponse.code,
      code_verifier: verifier,
    });

    return this.httpClient
      .post<ExchangeResponse>(this.tokenUrl, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        tap((result) => {
          result.state = authorizationResponse.state;
          localStorage.removeItem(result.state);
          this.addAccessToken(result);
        })
      );
  }


}
