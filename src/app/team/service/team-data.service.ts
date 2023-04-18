import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../dto/team';
import { Observable, map } from 'rxjs';

const API_HEADERS = new HttpHeaders({'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX','X-RapidAPI-Host': 'free-nba.p.rapidapi.com'});

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {
  
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<{'data': Team[]}>('https://free-nba.p.rapidapi.com/teams', {headers: API_HEADERS}).pipe(map(data => data.data));
  }
  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`https://free-nba.p.rapidapi.com/teams/${id}`, {headers: API_HEADERS});
  }
}
