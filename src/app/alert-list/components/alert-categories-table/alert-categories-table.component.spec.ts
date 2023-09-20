import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCategoriesTableComponent } from './alert-categories-table.component';

describe('AlertCategoriesTableComponent', () => {
  let component: AlertCategoriesTableComponent;
  let fixture: ComponentFixture<AlertCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertCategoriesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
