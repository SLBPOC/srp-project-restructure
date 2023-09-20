import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardViewGraphComponent } from './well-details-dynacard-view-graph.component';

describe('WellDetailsDynacardViewGraphComponent', () => {
  let component: WellDetailsDynacardViewGraphComponent;
  let fixture: ComponentFixture<WellDetailsDynacardViewGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardViewGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardViewGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
