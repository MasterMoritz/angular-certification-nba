import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Game } from '../dto/game';
import { formatDate } from '@angular/common';
import { DateService } from 'src/app/shared/service/date.service';
const API_HEADERS = new HttpHeaders({'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX','X-RapidAPI-Host': 'free-nba.p.rapidapi.com'});

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient, private dateService: DateService) { }

  getGamesForTeam(teamId:number, fromDate: Date, toDate:Date, resultLimit?:number):Observable<Game[]> {
    let dateRange: Date[] = this.dateService.getDatesBetween(fromDate, toDate);
    let params: HttpParams = new HttpParams();
    for(let date of dateRange) {
      params = params.append('dates[]', formatDate(date, 'yyyy-MM-dd', 'en'));
    }
    if (resultLimit) {
      params = params.append('per_page', resultLimit);
    }
    params = params.append('page', 0);
    params = params.append('team_ids[]', teamId);
    return this.http.get<{'data': Game[]}>('https://free-nba.p.rapidapi.com/games', {headers: API_HEADERS, params:params}).pipe(map(data => data.data));
  }
}
