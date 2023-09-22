import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmMeasuredComponent } from './spm-measured.component';

describe('SpmMeasuredComponent', () => {
  let component: SpmMeasuredComponent;
  let fixture: ComponentFixture<SpmMeasuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpmMeasuredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmMeasuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
