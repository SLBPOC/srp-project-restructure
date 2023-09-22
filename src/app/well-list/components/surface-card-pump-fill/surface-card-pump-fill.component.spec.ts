import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceCardPumpFillComponent } from './surface-card-pump-fill.component';

describe('SurfaceCardPumpFillComponent', () => {
  let component: SurfaceCardPumpFillComponent;
  let fixture: ComponentFixture<SurfaceCardPumpFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurfaceCardPumpFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurfaceCardPumpFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
