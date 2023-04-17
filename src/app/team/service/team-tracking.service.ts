import { Injectable } from '@angular/core';
import { Team } from '../dto/team';

@Injectable({
  providedIn: 'root'
})
export class TeamTrackingService {

  private trackedTeams: Team[] = [];
  constructor() { }

  trackTeam(team: Team): Team[]{
    this.trackedTeams.push(team);
    return this.getTrackedTeams();
  }
  
  getTrackedTeams(): Team[] {
    return this.trackedTeams;
  }
}
