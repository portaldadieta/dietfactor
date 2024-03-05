import { TestBed } from '@angular/core/testing';

import { ConsultFoodService } from './consult-food.service';

describe('ConsultFoodService', () => {
  let service: ConsultFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
