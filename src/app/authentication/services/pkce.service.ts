import { Pkce } from '../models/pkce';
import { RandomService } from './random.service';
import { SHA256, enc } from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable()
export class PkceService {
  private possibleChacters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

  constructor(private randomService: RandomService) {}

  public getPkce(): Pkce {
    const verifier = this.randomService.randomString(
      this.possibleChacters,
      128
    );

    const challenge = SHA256(verifier).toString(enc.Base64url);

    return {
      method: 'S256',
      challenge: challenge,
      verifier: verifier,
    };
  }
}
