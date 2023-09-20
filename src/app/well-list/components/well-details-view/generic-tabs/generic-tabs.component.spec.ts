import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTabsComponent } from './generic-tabs.component';

describe('GenericTabsComponent', () => {
  let component: GenericTabsComponent;
  let fixture: ComponentFixture<GenericTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericTabsComponent]
    });
    fixture = TestBed.createComponent(GenericTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
