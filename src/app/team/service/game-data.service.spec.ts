import { TestBed } from '@angular/core/testing';

import { GameDataService } from './game-data.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { GamesResponse } from '../api/response/games-response';
import { Game } from '../dto/game';
import { Observable, last } from 'rxjs';

describe('GameDataService', () => {
  let service: GameDataService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(GameDataService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all requested games', () => {
    let allGames: Observable<Game[]> = service.getGamesForTeam(6, new Date(2023, 3, 6), new Date(2023, 3, 17));
    allGames.subscribe(data => {
      expect(data).toHaveSize(3);
      expect(data).toContain(gameA);
      expect(data).toContain(gameB);
      expect(data).toContain(gameC);
    });
    const req: TestRequest = httpMock.expectOne(() => true);
    expect(req.request.url).toBe('https://free-nba.p.rapidapi.com/games');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.getAll('dates[]')).toHaveSize(12);
    req.flush(mockResponse);
  });

  it('should paginate through API correctly', () => {
    let allGames: Observable<Game[]> = service.getGamesForTeam(6, new Date(2023, 3, 6), new Date(2023, 3, 17), 2);
    allGames.pipe(last()).subscribe(data => {
      expect(data.length).toEqual(3)
      expect(data).toHaveSize(3);
      expect(data).toContain(gameA);
      expect(data).toContain(gameB);
      expect(data).toContain(gameC);
    });
    let req: TestRequest = httpMock.expectOne(() => true);
    expect(req.request.url).toBe('https://free-nba.p.rapidapi.com/games');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.getAll('dates[]')).toHaveSize(12);
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('per_page')).toEqual('2');
    req.flush(paginatedResponses[0]);

    req = httpMock.expectOne(() => true);
    expect(req.request.url).toBe('https://free-nba.p.rapidapi.com/games');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.getAll('dates[]')).toHaveSize(12);
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('per_page')).toEqual('2');
    req.flush(paginatedResponses[1]);
  });  

  const gameA: Game = {
    "id": 858554,
    "date": new Date("2023-04-06T00:00:00.000Z"),
    "home_team": {
      "id": 22,
      "abbreviation": "ORL",
      "city": "Orlando",
      "conference": "East",
      "division": "Southeast",
      "full_name": "Orlando Magic",
      "name": "Magic"
    },
    "home_team_score": 94,
    "period": 4,
    "postseason": false,
    "season": 2022,
    "status": "Final",
    "time": "Final",
    "visitor_team": {
      "id": 6,
      "abbreviation": "CLE",
      "city": "Cleveland",
      "conference": "East",
      "division": "Central",
      "full_name": "Cleveland Cavaliers",
      "name": "Cavaliers"
    },
    "visitor_team_score": 118
  };
  const gameB: Game = {
    "id": 858570,
    "date": new Date("2023-04-09T00:00:00.000Z"),
    "home_team": {
      "id": 6,
      "abbreviation": "CLE",
      "city": "Cleveland",
      "conference": "East",
      "division": "Central",
      "full_name": "Cleveland Cavaliers",
      "name": "Cavaliers"
    },
    "home_team_score": 95,
    "period": 4,
    "postseason": false,
    "season": 2022,
    "status": "Final",
    "time": "Final",
    "visitor_team": {
      "id": 4,
      "abbreviation": "CHA",
      "city": "Charlotte",
      "conference": "East",
      "division": "Southeast",
      "full_name": "Charlotte Hornets",
      "name": "Hornets"
    },
    "visitor_team_score": 106
  }
  const gameC: Game = {
    "id": 890555,
    "date": new Date("2023-04-15T00:00:00.000Z"),
    "home_team": {
      "id": 6,
      "abbreviation": "CLE",
      "city": "Cleveland",
      "conference": "East",
      "division": "Central",
      "full_name": "Cleveland Cavaliers",
      "name": "Cavaliers"
    },
    "home_team_score": 97,
    "period": 4,
    "postseason": true,
    "season": 2022,
    "status": "Final",
    "time": "Final",
    "visitor_team": {
      "id": 20,
      "abbreviation": "NYK",
      "city": "New York",
      "conference": "East",
      "division": "Atlantic",
      "full_name": "New York Knicks",
      "name": "Knicks"
    },
    "visitor_team_score": 101
  }
  const mockResponse: GamesResponse = {
    "data": [

      gameA
      ,
      gameB,
      gameC
    ],
    "meta": {
      "total_pages": 1,
      "current_page": 1,
      "next_page": null,
      "per_page": 4,
      "total_count": 3
    }
  }

  const paginatedResponses: GamesResponse[] = [{
    "data": [

      gameA
      ,
      gameB
    ],
    "meta": {
      "total_pages": 2,
      "current_page": 1,
      "next_page": 2,
      "per_page": 2,
      "total_count": 3
    }
  },
  {
    "data": [

      gameC
    ],
    "meta": {
      "total_pages": 2,
      "current_page": 2,
      "next_page": null,
      "per_page": 2,
      "total_count": 3
    }
  }]
});

