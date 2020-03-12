import { TestBed } from '@angular/core/testing';

import { NavlinksService } from './navlinks.service';

describe('NavlinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavlinksService = TestBed.get(NavlinksService);
    expect(service).toBeTruthy();
  });
});
