import { TestBed } from '@angular/core/testing';

import { PlanDietService } from './plan-diet.service';

describe('PlanDietService', () => {
  let service: PlanDietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
