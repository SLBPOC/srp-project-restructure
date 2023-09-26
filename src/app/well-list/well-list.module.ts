import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellListRoutingModule } from './well-list-routing.module';
import { WellListComponent } from './well-list.component';
// import { WellTreeView } from './components/well-tree-view/well-tree-view.component';
// import { WellTreeSearchComponent } from './components/well-tree-search/well-tree-search.component';
import { SharedModule } from '../shared/shared.module';
import { WellsComponent } from './components/wells/wells.component';
import { WellInfoEntryComponent } from './components/well-details-view/well-info-entry/well-info-entry.component';
import { CreateCustomFeedComponent } from './components/well-info/create-custom-feed/create-custom-feed.component';
import { WellInfoEventsComponent } from './components/well-details-view/well-info-events/well-info-events.component';
import { WellInfoAlertsComponent } from './components/well-details-view/well-info-alerts/well-info-alerts.component';
import { AlgorithmitiInnertabsComponent } from './components/well-details-view/algorithmiti-innertabs/algorithmiti-innertabs.component';
import { SlbAccordionComponent } from './components/well-details-view/slb-accordion/slb-accordion.component';
import { WellinfoDynacardComponent } from './components/well-details-view/wellinfo-dynacard/wellinfo-dynacard.component';
import { WellInfoComponent } from './components/well-info/well-info.component';
import { WellInfoImageDescriptionComponent } from './components/well-info-image-description/well-info-image-description.component';
import { AlgomitFiltertabsComponent } from './components/well-details-view/algomit-filtertabs/algomit-filtertabs.component';
import { CoreModule } from '../core/core.module';
import { DynacardChipsComponent } from './components/well-details-dynacard/dynacard-chips/dynacard-chips.component';
import { WellDetailsDynacardCardDetailsComponent } from './components/well-details-dynacard/well-details-dynacard-card-details/well-details-dynacard-card-details.component';
import { WellDetailsDynacardCardLegendComponent } from './components/well-details-dynacard/well-details-dynacard-card-legend/well-details-dynacard-card-legend.component';
import { WellDetailsDynacardCardDatagridComponent } from './components/well-details-dynacard/well-details-dynacard-card-datagrid/well-details-dynacard-card-datagrid.component';
import { WellDetailsDynacardCardTableComponent } from './components/well-details-dynacard/well-details-dynacard-card-table/well-details-dynacard-card-table.component';
import { WellDetailsDynacardViewGraphComponent } from './components/well-details-dynacard/well-details-dynacard-view-graph/well-details-dynacard-view-graph.component';
import { WellDetailsDynacardComponent } from './components/well-details-dynacard/well-details-dynacard.component';
import { CreateGatewayInnertabsComponent } from './components/well-details-view/create-gateway-innertabs/create-gateway-innertabs.component';
import { GenericTabsComponent } from './components/well-details-view/generic-tabs/generic-tabs.component';
import { WellPerformanceComponent } from './components/well-performance/well-performance.component';
import { WellViewParametersComponent } from './components/well-view-parameters/well-view-parameters.component';
import { WellFilterAndSortComponent } from './components/well-filter-and-sort/well-filter-and-sort.component';
import { ParChartComponent } from './components/well-details-dynacard/par-chart/par-chart.component';
import { WellDetailsDynacardBarchartComponent } from './components/well-details-dynacard/well-details-dynacard-barchart/well-details-dynacard-barchart.component';
import { BubbleChartComponent } from './components/well-details-dynacard/bubble-chart/bubble-chart.component';
import { PumpFillageNoOfCycleComponent } from './components/pump-fillage-no-of-cycle/pump-fillage-no-of-cycle.component';
import { SpmMeasuredComponent } from './components/spm-measured/spm-measured.component';
import { SurfaceCardPumpComponent } from './components/surface-card-pump/surface-card-pump.component';
import { SurfaceCardPumpFillComponent } from './components/surface-card-pump-fill/surface-card-pump-fill.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EventFilterAndSortComponent } from './components/event-filter-and-sort/event-filter-and-sort.component';
import { ListOfTimeComponent } from './components/list-of-time/list-of-time.component';
import { UiDynacardInfoComponent } from './components/well-details-dynacard/ui-dynacard-info/ui-dynacard-info.component';

@NgModule({
  declarations: [
    WellListComponent,
    // WellTreeView,
    // WellTreeSearchComponent,
    WellsComponent,
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
    AlgomitFiltertabsComponent,
    WellDetailsDynacardBarchartComponent,
    DynacardChipsComponent,
    WellDetailsDynacardCardDetailsComponent,
    WellDetailsDynacardCardLegendComponent,
    WellDetailsDynacardCardDatagridComponent,
    WellDetailsDynacardCardTableComponent,
    WellDetailsDynacardViewGraphComponent,
    WellDetailsDynacardComponent,
    AlgomitFiltertabsComponent,
    AlgorithmitiInnertabsComponent,
    CreateGatewayInnertabsComponent,
    GenericTabsComponent,
    SlbAccordionComponent,
    WellInfoAlertsComponent,
    WellInfoEntryComponent,
    WellInfoEventsComponent,
    WellinfoDynacardComponent,
    WellInfoComponent,
    WellPerformanceComponent,
    WellViewParametersComponent,
    WellInfoImageDescriptionComponent,
    WellFilterAndSortComponent,
    UiDynacardInfoComponent,
    ParChartComponent,
    BubbleChartComponent,
    PumpFillageNoOfCycleComponent,
    SpmMeasuredComponent,
    SurfaceCardPumpComponent,
    SurfaceCardPumpFillComponent,
    EventFilterAndSortComponent,
    ListOfTimeComponent,
    UiDynacardInfoComponent
  ],
  imports: [
    CommonModule,
    WellListRoutingModule,
    SharedModule,
    CoreModule,
    HighchartsChartModule
  ],
  exports: [
    WellFilterAndSortComponent
    // WellTreeSearchComponent, WellTreeView
  ]
})
export class WellListModule { }
