import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGatewayInnertabsComponent } from './create-gateway-innertabs.component';

describe('CreateGatewayInnertabsComponent', () => {
  let component: CreateGatewayInnertabsComponent;
  let fixture: ComponentFixture<CreateGatewayInnertabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGatewayInnertabsComponent]
    });
    fixture = TestBed.createComponent(CreateGatewayInnertabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
