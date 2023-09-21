import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterAndSortComponent } from './event-filter-and-sort.component';

describe('EventFilterAndSortComponent', () => {
  let component: EventFilterAndSortComponent;
  let fixture: ComponentFixture<EventFilterAndSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFilterAndSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFilterAndSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
