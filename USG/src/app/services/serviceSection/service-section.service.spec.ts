import { TestBed } from '@angular/core/testing';

import { ServiceSectionService } from './service-section.service';

describe('ServiceSectionService', () => {
  let service: ServiceSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
