import { TestBed } from '@angular/core/testing';

import { InscripcionMService } from './inscripcion-m.service';

describe('InscripcionMService', () => {
  let service: InscripcionMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
