import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbAccordionComponent } from './slb-accordion.component';

describe('SlbAccordionComponent', () => {
  let component: SlbAccordionComponent;
  let fixture: ComponentFixture<SlbAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlbAccordionComponent]
    });
    fixture = TestBed.createComponent(SlbAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
