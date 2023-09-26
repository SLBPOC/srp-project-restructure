import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardCardDetailsComponent } from './well-details-dynacard-card-details.component';
import { HttpClientModule } from '@angular/common/http';
import { DynacardService } from '../../../services/dynacard.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

export class DynacardServiceStub {

  selectedTime: BehaviorSubject<{ selected: string, addedOrRemoved: boolean }> 
  = new BehaviorSubject(null);
  selectedTimeInGraph = new Subject<string>();
  selectedClassification: Subject<number> = new Subject();

  constructor() {this.selectedTime.next({selected: '', addedOrRemoved: true})}

  
}
describe('WellDetailsDynacardCardDetailsComponent', () => {
  let component: WellDetailsDynacardCardDetailsComponent;
  let fixture: ComponentFixture<WellDetailsDynacardCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardCardDetailsComponent ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        // HighchartsChartModule,
        // FormsModule,
        // ReactiveFormsModule,
        // HttpClientModule,
        // MatFormFieldModule,
        // MatSelectModule,
        // MatExpansionModule,
        // MatTabsModule,
        // MatCardModule
      ],
      providers: [
        HttpClientModule, 
        // AlgorithmsAndMitigationsService,
        { provide: DynacardService, useClass: DynacardServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
