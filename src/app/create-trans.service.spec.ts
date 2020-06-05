import { TestBed } from '@angular/core/testing';

import { CreateTransService } from './create-trans.service';

describe('CreateTransService', () => {
  let service: CreateTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
