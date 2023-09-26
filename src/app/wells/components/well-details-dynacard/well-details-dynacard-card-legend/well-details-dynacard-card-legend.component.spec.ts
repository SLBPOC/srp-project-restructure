import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardCardLegendComponent } from './well-details-dynacard-card-legend.component';

describe('WellDetailsDynacardCardLegendComponent', () => {
  let component: WellDetailsDynacardCardLegendComponent;
  let fixture: ComponentFixture<WellDetailsDynacardCardLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardCardLegendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardCardLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
