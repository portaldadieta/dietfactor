/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultDietsService } from './consult-diets.service';

describe('Service: ConsultDiets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultDietsService]
    });
  });

  it('should ...', inject([ConsultDietsService], (service: ConsultDietsService) => {
    expect(service).toBeTruthy();
  }));
});
