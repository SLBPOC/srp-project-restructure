import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellListComponent } from './well-list.component';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { WellsComponent } from './components/wells/wells.component';
import { WellInfoEntryComponent } from './components/well-details-view/well-info-entry/well-info-entry.component';
import { WellInfoComponent } from './components/well-info/well-info.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: WellsComponent },
      {
        path:'well-info-v2/:id',
        component:WellInfoEntryComponent
      },
      {
        path:'well-info',
        component:WellInfoComponent
      },
      {
        path:'well-info/:id',
        component:WellInfoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellListRoutingModule { }
