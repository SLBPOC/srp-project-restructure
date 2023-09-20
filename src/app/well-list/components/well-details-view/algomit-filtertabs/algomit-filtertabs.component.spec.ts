import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgomitFiltertabsComponent } from './algomit-filtertabs.component';

describe('AlgomitFiltertabsComponent', () => {
  let component: AlgomitFiltertabsComponent;
  let fixture: ComponentFixture<AlgomitFiltertabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlgomitFiltertabsComponent]
    });
    fixture = TestBed.createComponent(AlgomitFiltertabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
