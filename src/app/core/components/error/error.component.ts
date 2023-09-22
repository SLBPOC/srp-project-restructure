import { Component, OnDestroy } from '@angular/core';
import { ErrorService } from '../../services/error.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {
  errorMessages: string[] = [];
  constructor(
    private _errorService:ErrorService
  ) {}

  ngOnInit(): void {
    this._errorService.errorMessages$.subscribe((messages) => {
      this.errorMessages = messages;
    });
  }

  clearErrors() {
    this._errorService.clearErrors();
  }

  ngOnDestroy() {
    this.clearErrors();
  }
}
