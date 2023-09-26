import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoAlertsComponent } from './well-info-alerts.component';

describe('WellInfoAlertsComponent', () => {
  let component: WellInfoAlertsComponent;
  let fixture: ComponentFixture<WellInfoAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellInfoAlertsComponent]
    });
    fixture = TestBed.createComponent(WellInfoAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
