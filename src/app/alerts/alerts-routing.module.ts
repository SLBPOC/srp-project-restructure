import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertListComponent } from './alert-list.component';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: AlertListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
