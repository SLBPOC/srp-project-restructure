import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoEntryComponent } from './well-info-entry.component';

describe('SlidingTabsComponent', () => {
  let component: WellInfoEntryComponent;
  let fixture: ComponentFixture<WellInfoEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellInfoEntryComponent]
    });
    fixture = TestBed.createComponent(WellInfoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
