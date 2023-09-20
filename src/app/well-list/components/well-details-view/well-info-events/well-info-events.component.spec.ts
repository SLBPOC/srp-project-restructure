import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoEventsComponent } from './well-info-events.component';

describe('WellInfoEventsComponent', () => {
  let component: WellInfoEventsComponent;
  let fixture: ComponentFixture<WellInfoEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellInfoEventsComponent]
    });
    fixture = TestBed.createComponent(WellInfoEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
