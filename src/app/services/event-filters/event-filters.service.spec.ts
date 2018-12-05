import { TestBed } from '@angular/core/testing';

import { EventFiltersService } from './event-filters.service';

describe('EventFiltersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventFiltersService = TestBed.get(EventFiltersService);
    expect(service).toBeTruthy();
  });
});
