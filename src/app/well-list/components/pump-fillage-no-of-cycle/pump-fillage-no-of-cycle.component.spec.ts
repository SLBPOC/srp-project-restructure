import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpFillageNoOfCycleComponent } from './pump-fillage-no-of-cycle.component';

describe('PumpFillageNoOfCycleComponent', () => {
  let component: PumpFillageNoOfCycleComponent;
  let fixture: ComponentFixture<PumpFillageNoOfCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpFillageNoOfCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpFillageNoOfCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
