import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventListRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventListRoutingModule,
    SharedModule
  ]
})
export class EventListModule { }
