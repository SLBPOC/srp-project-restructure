import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventFilterAndSortComponent } from './components/event-filter-and-sort/event-filter-and-sort.component';

@NgModule({
  declarations: [
    EventListComponent,
    EventFilterAndSortComponent
  ],
  imports: [
    CommonModule,
    EventListRoutingModule,
    SharedModule
  ]
})
export class EventListModule { }
