import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceCardPumpComponent } from './surface-card-pump.component';

describe('SurfaceCardPumpComponent', () => {
  let component: SurfaceCardPumpComponent;
  let fixture: ComponentFixture<SurfaceCardPumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurfaceCardPumpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurfaceCardPumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
