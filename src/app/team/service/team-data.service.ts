import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, map, mergeMap } from 'rxjs';
import { API_HEADERS } from '../api/api-config';
import { Team } from '../dto/team';

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

  getTeamByCode(teamCode: string): Observable<Team> {
    // the utilized API does not have an endpoint to directly grab a team by its team code
    // thus, the teams are filtered to return the first match
    return this.getTeams().pipe(mergeMap(data => data), first(team => team.abbreviation === teamCode));
  }
}
