import { TestBed } from '@angular/core/testing';

import { AnneeUniversitaireService } from './annee-universitaire.service';

describe('AnneeUniversitaireService', () => {
  let service: AnneeUniversitaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeUniversitaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
