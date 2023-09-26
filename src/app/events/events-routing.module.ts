import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list.component';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: EventListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
