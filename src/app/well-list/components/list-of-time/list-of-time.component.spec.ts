import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTimeComponent } from './list-of-time.component';

describe('ListOfTimeComponent', () => {
  let component: ListOfTimeComponent;
  let fixture: ComponentFixture<ListOfTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
