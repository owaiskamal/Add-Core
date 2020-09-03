import { TestBed } from '@angular/core/testing';

import { TransStageService } from './trans-stage.service';

describe('TransStageService', () => {
  let service: TransStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
