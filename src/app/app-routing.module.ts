import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AuthGuard } from './authentication/auth.guard';
import { CallbackComponent } from './authentication/components/callback/callback.component';

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
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'Callback', component: CallbackComponent},
  { path: 'alert-list', loadChildren: () => import('./alert-list/alert-list.module').then(m => m.AlertListModule) },
  { path: 'well-list', loadChildren: () => import('./well-list/well-list.module').then(m => m.WellListModule) },
  { path: 'alert-list', loadChildren: () => import('./alert-list/alert-list.module').then(m => m.AlertListModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'event-list', loadChildren: () => import('./event-list/event-list.module').then(m => m.EventListModule) },
  { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
