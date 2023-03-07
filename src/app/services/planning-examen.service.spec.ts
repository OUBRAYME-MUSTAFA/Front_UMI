import { TestBed } from '@angular/core/testing';

import { PlanningExamenService } from './planning-examen.service';

describe('PlanningExamenService', () => {
  let service: PlanningExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
