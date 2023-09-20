import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellViewParametersComponent } from './well-view-parameters.component';

describe('WellViewParametersComponent', () => {
  let component: WellViewParametersComponent;
  let fixture: ComponentFixture<WellViewParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellViewParametersComponent]
    });
    fixture = TestBed.createComponent(WellViewParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
