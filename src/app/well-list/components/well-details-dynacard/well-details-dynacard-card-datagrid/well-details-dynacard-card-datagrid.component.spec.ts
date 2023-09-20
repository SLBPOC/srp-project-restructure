import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardCardDatagridComponent } from './well-details-dynacard-card-datagrid.component';

describe('WellDetailsDynacardCardDatagridComponent', () => {
  let component: WellDetailsDynacardCardDatagridComponent;
  let fixture: ComponentFixture<WellDetailsDynacardCardDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardCardDatagridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardCardDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
