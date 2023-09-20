import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertListRoutingModule } from './alert-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlertListComponent } from './alert-list.component';


@NgModule({
  declarations: [
    AlertListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlertListRoutingModule,
    
  ]
})
export class AlertListModule { }
