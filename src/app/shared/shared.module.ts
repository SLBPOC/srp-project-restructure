import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_MENU_SCROLL_STRATEGY, MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSliderModule} from '@angular/material/slider';
import { AlertListService } from './services/alert-list.service';
import { WellsService } from './services/wells.service';
import { TreeViewService } from './services/tree-view.service';
import { AlgorithmsAndMitigationsService } from './services/algorithms-and-mitigations.service';
import { DashboardService } from './services/dashboard.service';
import { StylePaginatorDirective } from './directives/style-paginator-dierctives';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { DynacardService } from './services/dynacard.service';
import { ChecklistDatabase, WellTreeView } from './components/well-tree-view/well-tree-view.component';
import { WellTreeSearchComponent } from './components/well-tree-search/well-tree-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WellTreeListComponent } from './components/well-tree-list/well-tree-list.component';
import { CustomAlertService } from './services/customAlert.service';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DatePipe } from '@angular/common';
import { EventListService } from './services/event-list.service';

@NgModule({
  declarations: [
    SidenavComponent,
    StylePaginatorDirective,
    WellTreeView,
    WellTreeSearchComponent,
    WellTreeListComponent,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule, 
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MtxTooltipModule,
    NgxMatTimepickerModule,
    MatInputModule,
    MatSelectModule,
      ],
  exports: [
    WellTreeSearchComponent,
    WellTreeView,
    WellTreeListComponent,
    HighchartsChartModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatTreeModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule, 
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSliderModule,
    MtxTooltipModule,
    NgxMatTimepickerModule
  ],
  providers: [
    DatePipe,
    BsModalService,
    AlertListService,
    WellsService,
    TreeViewService,
    AlgorithmsAndMitigationsService,
    DashboardService,
    ChecklistDatabase,
    DynacardService,
    CustomAlertService,
    EventListService
  ],
    entryComponents: []
})
export class SharedModule {}
