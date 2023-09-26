import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCategoriesChartComponent } from './alert-categories-chart.component';

describe('AlertCategoriesChartComponent', () => {
  let component: AlertCategoriesChartComponent;
  let fixture: ComponentFixture<AlertCategoriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertCategoriesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
