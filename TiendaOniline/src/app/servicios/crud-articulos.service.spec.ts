import { TestBed } from '@angular/core/testing';

import { CrudArticulosService } from './crud-articulos.service';

describe('CrudArticulosService', () => {
  let service: CrudArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
