import { TestBed } from '@angular/core/testing';

import { SurfaceCardPumpService } from './surface-card-pump.service';

describe('SurfaceCardPumpService', () => {
  let service: SurfaceCardPumpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurfaceCardPumpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
