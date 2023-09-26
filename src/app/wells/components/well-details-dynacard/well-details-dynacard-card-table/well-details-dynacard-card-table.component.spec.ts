import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardCardTableComponent } from './well-details-dynacard-card-table.component';

describe('WellDetailsDynacardCardTableComponent', () => {
  let component: WellDetailsDynacardCardTableComponent;
  let fixture: ComponentFixture<WellDetailsDynacardCardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardCardTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardCardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
