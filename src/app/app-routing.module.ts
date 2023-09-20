import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

// const routes: Routes = [
//   {
//     path: '', component: SidenavComponent,
//     children: [
//       { path: 'well-list', loadChildren: () => import('./well-list/well-list.module').then(m => m.WellListModule) },
//       { path: 'alert-list', loadChildren: () => import('./alert-list/alert-list.module').then(m => m.AlertListModule) },
//       { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
//       { path: 'event-list', loadChildren: () => import('./event-list/event-list.module').then(m => m.EventListModule) }
//     ]
//   }
// ]

const routes: Routes = [
  { path: '', loadChildren: () => import('./alert-list/alert-list.module').then(m => m.AlertListModule) },
  { path: 'well-list', loadChildren: () => import('./well-list/well-list.module').then(m => m.WellListModule) },
  { path: 'alert-list', loadChildren: () => import('./alert-list/alert-list.module').then(m => m.AlertListModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'event-list', loadChildren: () => import('./event-list/event-list.module').then(m => m.EventListModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
