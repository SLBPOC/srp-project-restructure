import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { WellsComponent } from './components/wells/wells.component';
import { WellInfoComponent } from './components/well-info/well-info.component';
import { UiDynacardInfoComponent } from './components/well-details-dynacard/ui-dynacard-info/ui-dynacard-info.component';
import { WellDetailsDynacardComponent } from './components/well-details-dynacard/well-details-dynacard.component';
import { ParChartComponent } from './components/well-details-dynacard/par-chart/par-chart.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: WellsComponent },
      { path: 'well-info-v3/:id', component: UiDynacardInfoComponent },
      { path: 'Parameter', component: ParChartComponent },
      { path: 'well-details-dynacard', component: WellDetailsDynacardComponent },
      { path: 'wells/dyna/:id', component: WellDetailsDynacardComponent },
      {
        path: 'well-info/:id',
        component: WellInfoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellsRoutingModule { }
