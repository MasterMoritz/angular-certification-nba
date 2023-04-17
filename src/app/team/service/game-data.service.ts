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
      params.append('dates[]', formatDate(date, 'yyyy-MM-dd', 'en'));
    }
    if (resultLimit) {
      params.append('per_page', resultLimit);
    }
    params.append('page', 0);
    return this.http.get<{'data': Game[]}>('https://free-nba.p.rapidapi.com/games?page=0&dates[]=2023-04-06&dates[]=2023-04-15&per_page=12&team_ids[]=26', {headers: API_HEADERS}).pipe(map(data => data.data));
  }

  private getDatesBetween(fromDate: Date, toDate:Date): Date[] {
    let current:Date = new Date(fromDate.getDate());
    let dates: Date[] = [];
    while (current <= toDate) {
      dates.push(new Date(current));
      current = new Date(current.getDate() + 1);
    }
    return dates;
  }
}
