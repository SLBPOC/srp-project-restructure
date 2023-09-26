import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParChartComponent } from './par-chart.component';

describe('ParChartComponent', () => {
  let component: ParChartComponent;
  let fixture: ComponentFixture<ParChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
