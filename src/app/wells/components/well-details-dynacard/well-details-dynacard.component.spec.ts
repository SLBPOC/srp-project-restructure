import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailsDynacardComponent } from './well-details-dynacard.component';

describe('WellDetailsDynacardComponent', () => {
  let component: WellDetailsDynacardComponent;
  let fixture: ComponentFixture<WellDetailsDynacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailsDynacardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailsDynacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
