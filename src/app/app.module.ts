import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { CallbackComponent } from './authentication/components/callback/callback.component';
// import { TokenInterceptor } from './authentication/token.interceptor';
// import { AuthorizationService } from './authentication/services/authorization.service';
// import { PkceService } from './authentication/services/pkce.service';
// import { RandomService } from './authentication/services/random.service';
// import { StateService } from './authentication/services/state.service';
import { CoreModule } from './core/core.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // CallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule

  ],
  providers: [
    // AuthorizationService, 
    // PkceService, 
    // RandomService, 
    // StateService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
