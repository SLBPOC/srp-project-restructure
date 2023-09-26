import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoImageDescriptionComponent } from './well-info-image-description.component';

describe('WellInfoImageDescriptionComponent', () => {
  let component: WellInfoImageDescriptionComponent;
  let fixture: ComponentFixture<WellInfoImageDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellInfoImageDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellInfoImageDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
