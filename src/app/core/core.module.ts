import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthorizationService } from './services/authorization.service';
import { PkceService } from './services/pkce.service';
import { RandomService } from './services/random.service';
import { StateService } from './services/state.service';


@NgModule({
  declarations: [
    ErrorComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    ErrorComponent,
    CallbackComponent
  ],
  providers: [
    ErrorService,
    AuthorizationService,
    PkceService,
    RandomService,
    StateService
  ],
})
export class CoreModule { }
