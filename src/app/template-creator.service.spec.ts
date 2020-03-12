import { TestBed } from '@angular/core/testing';

import { TemplateCreatorService } from './template-creator.service';

describe('TemplateCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateCreatorService = TestBed.get(TemplateCreatorService);
    expect(service).toBeTruthy();
  });
});
