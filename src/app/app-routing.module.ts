import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './authentication/components/callback/callback.component';
import { AuthGuard } from './authentication/auth.guard';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

const routes: Routes = [
  { path: 'Callback', component: CallbackComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: SidenavComponent,
    children: [
      { path: 'wells', loadChildren: () => import('./wells/wells.module').then(m => m.WellsModule) },
      { path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
      { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) }
    ]
  },
]

// const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: 'Callback', component: CallbackComponent },
//   { path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule) },
//   { path: 'wells', loadChildren: () => import('./wells/wells.module').then(m => m.WellListModule) },
//   { path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule) },
//   { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
//   { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventListModule) },
// ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
