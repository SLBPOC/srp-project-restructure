import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmitiInnertabsComponent } from './algorithmiti-innertabs.component';

describe('AlgorithmitiInnertabsComponent', () => {
  let component: AlgorithmitiInnertabsComponent;
  let fixture: ComponentFixture<AlgorithmitiInnertabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlgorithmitiInnertabsComponent]
    });
    fixture = TestBed.createComponent(AlgorithmitiInnertabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
