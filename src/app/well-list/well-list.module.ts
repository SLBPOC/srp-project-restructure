import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellListRoutingModule } from './well-list-routing.module';
import { WellListComponent } from './well-list.component';
// import { WellTreeView } from './components/well-tree-view/well-tree-view.component';
// import { WellTreeSearchComponent } from './components/well-tree-search/well-tree-search.component';
import { SharedModule } from '../shared/shared.module';
import { WellsComponent } from './components/wells/wells.component';
import { WellFilterAndSortComponent } from './components/well-filter-and-sort/well-filter-and-sort.component';
import { WellInfoEntryComponent } from './components/well-details-view/well-info-entry/well-info-entry.component';
import { CreateCustomFeedComponent } from './components/well-info/create-custom-feed/create-custom-feed.component';
import { CreateGatewayInnertabsComponent } from './components/well-details-view/create-gateway-innertabs/create-gateway-innertabs.component';
import { GenericTabsComponent } from './components/well-details-view/generic-tabs/generic-tabs.component';
import { WellInfoEventsComponent } from './components/well-details-view/well-info-events/well-info-events.component';
import { WellInfoAlertsComponent } from './components/well-details-view/well-info-alerts/well-info-alerts.component';
import { AlgorithmitiInnertabsComponent } from './components/well-details-view/algorithmiti-innertabs/algorithmiti-innertabs.component';
import { SlbAccordionComponent } from './components/well-details-view/slb-accordion/slb-accordion.component';
import { WellinfoDynacardComponent } from './components/well-details-view/wellinfo-dynacard/wellinfo-dynacard.component';
import { WellInfoComponent } from './components/well-info/well-info.component';
import { WellInfoImageDescriptionComponent } from './components/well-info-image-description/well-info-image-description.component';
import { AlgomitFiltertabsComponent } from './components/well-details-view/algomit-filtertabs/algomit-filtertabs.component';

@NgModule({
  declarations: [
    WellListComponent,
    // WellTreeView,
    // WellTreeSearchComponent,
    WellsComponent,
    WellFilterAndSortComponent,
    WellInfoEntryComponent,
    CreateCustomFeedComponent,
    CreateGatewayInnertabsComponent,
    GenericTabsComponent,
    WellInfoEventsComponent,
    WellInfoAlertsComponent,
    AlgorithmitiInnertabsComponent,
    SlbAccordionComponent,
    WellinfoDynacardComponent,
    WellInfoComponent,
    WellInfoImageDescriptionComponent,
    AlgorithmitiInnertabsComponent,
    AlgomitFiltertabsComponent
  ],
  imports: [
    CommonModule,
    WellListRoutingModule,
    SharedModule,
  ],
  // exports: [
  //   WellTreeSearchComponent, WellTreeView
  // ]
})
export class WellListModule { }
