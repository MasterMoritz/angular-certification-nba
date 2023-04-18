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

  it('should calculate the correct date range', () => {
    let dates: Date[] = service.getDatesBetween(new Date(2022, 10, 29), new Date(2022, 11, 2));
    expect(dates).toHaveSize(4);
    expect(dates[2]).toEqual(new Date(2022, 11, 1));
  });
});
