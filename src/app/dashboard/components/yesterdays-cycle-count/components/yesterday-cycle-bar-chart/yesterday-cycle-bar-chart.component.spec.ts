import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YesterdayCycleBarChartComponent } from './yesterday-cycle-bar-chart.component';


describe('ParameterChartComponent', () => {
  let component: YesterdayCycleBarChartComponent;
  let fixture: ComponentFixture<YesterdayCycleBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesterdayCycleBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesterdayCycleBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
