import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [ErrorComponent],
  providers: [ErrorService]
})
export class CoreModule { }
