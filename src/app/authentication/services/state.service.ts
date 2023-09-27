import { Injectable } from '@angular/core';
import { RandomService } from './random.service';

@Injectable()
export class StateService {
  private possibleChacters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private randomService: RandomService) {}

  public getState(length: number = 40): string {
    return this.randomService.randomString(this.possibleChacters, length);
  }
}
