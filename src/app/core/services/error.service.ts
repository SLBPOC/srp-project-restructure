import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessagesSubject = new BehaviorSubject<string[]>([]);
  errorMessages$: Observable<string[]> = this.errorMessagesSubject.asObservable();

  addError(message: string) {
    const currentErrors = this.errorMessagesSubject.value;
    currentErrors.push(message);
    this.errorMessagesSubject.next(currentErrors);
  }

  clearErrors() {
    this.errorMessagesSubject.next([]);
  }
}