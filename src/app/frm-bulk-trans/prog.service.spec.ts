import { TestBed } from '@angular/core/testing';

import { ProgService } from './prog.service';

describe('ProgService', () => {
  let service: ProgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
