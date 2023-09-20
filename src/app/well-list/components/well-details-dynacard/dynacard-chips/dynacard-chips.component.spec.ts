import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynacardChipsComponent } from './dynacard-chips.component';

describe('DynacardChipsComponent', () => {
  let component: DynacardChipsComponent;
  let fixture: ComponentFixture<DynacardChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynacardChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynacardChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
