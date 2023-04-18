import { TestBed } from '@angular/core/testing';

import { TeamDataService } from './team-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TeamDataService', () => {
  let service: TeamDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
    ]});
    service = TestBed.inject(TeamDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
