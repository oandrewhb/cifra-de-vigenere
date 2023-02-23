import { TestBed } from '@angular/core/testing';

import { CifraDeVigenereService } from './cifra-de-vigenere.service';

describe('CifraDeVigenereService', () => {
  let service: CifraDeVigenereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifraDeVigenereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
