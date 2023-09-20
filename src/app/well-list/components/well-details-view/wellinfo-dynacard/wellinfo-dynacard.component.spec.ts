import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellinfoDynacardComponent } from './wellinfo-dynacard.component';

describe('WellinfoDynacardComponent', () => {
  let component: WellinfoDynacardComponent;
  let fixture: ComponentFixture<WellinfoDynacardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellinfoDynacardComponent]
    });
    fixture = TestBed.createComponent(WellinfoDynacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
