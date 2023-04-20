import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../dto/team';
import { Observable, map } from 'rxjs';
import { API_HEADERS } from '../api/api-config';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<{ 'data': Team[] }>('https://free-nba.p.rapidapi.com/teams', { headers: API_HEADERS }).pipe(map(data => data.data));
  }
  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`https://free-nba.p.rapidapi.com/teams/${id}`, { headers: API_HEADERS });
  }
}
