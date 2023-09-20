import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardViewDataComponent } from './well-details-dynacard-view-data.component';

describe('WellDetailsDynacardViewDataComponent', () => {
  let component: WellDetailsDynacardViewDataComponent;
  let fixture: ComponentFixture<WellDetailsDynacardViewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardViewDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
