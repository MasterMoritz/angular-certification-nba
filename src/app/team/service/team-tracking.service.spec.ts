import { TestBed } from '@angular/core/testing';

import { TeamTrackingService } from './team-tracking.service';

describe('TeamTrackingService', () => {
  let service: TeamTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
