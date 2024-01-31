/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouteService } from './route.service';

describe('Service: Route', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteService]
    });
  });

  it('should ...', inject([RouteService], (service: RouteService) => {
    expect(service).toBeTruthy();
  }));
});
