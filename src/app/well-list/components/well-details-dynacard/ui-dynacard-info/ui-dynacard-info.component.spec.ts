import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDynacardInfoComponent } from './ui-dynacard-info.component';

describe('UiDynacardInfoComponent', () => {
  let component: UiDynacardInfoComponent;
  let fixture: ComponentFixture<UiDynacardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiDynacardInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDynacardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
