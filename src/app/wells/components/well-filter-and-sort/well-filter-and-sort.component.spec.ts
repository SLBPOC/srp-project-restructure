import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellFilterAndSortComponent } from './well-filter-and-sort.component';

describe('WellFilterAndSortComponent', () => {
  let component: WellFilterAndSortComponent;
  let fixture: ComponentFixture<WellFilterAndSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellFilterAndSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellFilterAndSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
