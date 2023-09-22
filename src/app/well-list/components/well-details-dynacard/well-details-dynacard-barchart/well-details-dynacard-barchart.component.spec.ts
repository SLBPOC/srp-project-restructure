import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardBarchartComponent } from './well-details-dynacard-barchart.component';

describe('WellDetailsDynacardBarchartComponent', () => {
  let component: WellDetailsDynacardBarchartComponent;
  let fixture: ComponentFixture<WellDetailsDynacardBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardBarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
