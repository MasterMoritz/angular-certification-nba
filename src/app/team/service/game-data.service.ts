import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, delay, expand, from, map, mergeMap, of, reduce, repeat, scan, takeUntil, takeWhile, tap } from 'rxjs';
import { Game } from '../dto/game';
import { formatDate } from '@angular/common';
import { GamesResponse } from '../api/response/games-response';
import { DateService } from './date.service';
import { API_HEADERS } from '../api/api-config';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient, private dateService: DateService) { }

  getGamesForTeam(teamId: number, fromDate: Date, toDate: Date, resultLimit?: number): Observable<Game[]> {
    let dateRange: Date[] = this.dateService.getDatesBetween(fromDate, toDate);
    let params: HttpParams = new HttpParams();
    for (let date of dateRange) {
      params = params.append('dates[]', formatDate(date, 'yyyy-MM-dd', 'en'));
    }
    params = params.append('per_page', resultLimit ? resultLimit : 25);
    params = params.append('team_ids[]', teamId);
    params = params.set('page', 0);

    return this._getGamesForTeam(params).pipe(
      expand(res => res.meta.next_page === null ? EMPTY : this._getGamesForTeam(params.set('page', res.meta.next_page))),
      scan((acc, val) => {
        acc = [...acc, ...val.data]
        return acc
      }, <Game[]>[]),
    );
  }

  private _getGamesForTeam(params: HttpParams): Observable<GamesResponse> {
    return this.http.get<GamesResponse>('https://free-nba.p.rapidapi.com/games', { headers: API_HEADERS, params: params })
  }
}
