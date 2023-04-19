import { TestBed } from '@angular/core/testing';

import { GameDataService } from './game-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GameDataService', () => {
  let service: GameDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
    ]});
    service = TestBed.inject(GameDataService);
    httpMock = TestBed.inject(HttpTestingController); // <-- here
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
