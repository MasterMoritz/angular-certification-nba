import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Game } from '../dto/game';
import { formatDate } from '@angular/common';
const API_HEADERS = new HttpHeaders({'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX','X-RapidAPI-Host': 'free-nba.p.rapidapi.com'});

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  getGamesForTeam(teamId:number, fromDate: Date, toDate:Date, resultLimit?:number):Observable<Game[]> {
    let dateRange: Date[] = this.getDatesBetween(fromDate, toDate);
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

  getDatesBetween(fromDate: Date, toDate:Date): Date[] {
    let current:Date = new Date(fromDate);
    let dates: Date[] = [];
    
    while (current <= toDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  }
}
