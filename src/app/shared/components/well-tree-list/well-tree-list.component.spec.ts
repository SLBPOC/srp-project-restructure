import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellTreeListComponent } from './well-tree-list.component';

describe('WellListComponent', () => {
  let component: WellTreeListComponent;
  let fixture: ComponentFixture<WellTreeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellTreeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
