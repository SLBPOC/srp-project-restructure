import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomFeedComponent } from './create-custom-feed.component';

describe('CreateCustomFeedComponent', () => {
  let component: CreateCustomFeedComponent;
  let fixture: ComponentFixture<CreateCustomFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
