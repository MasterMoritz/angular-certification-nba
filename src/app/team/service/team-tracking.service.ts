import { Injectable } from '@angular/core';
import { Team } from '../dto/team';

@Injectable({
  providedIn: 'root'
})
export class TeamTrackingService {

  private trackedTeams: Team[] = [];
  constructor() { }

  trackTeam(team: Team): Team[] {
    if (team && -1 === this.trackedTeams.findIndex(t => t.id === team.id)) {
      this.trackedTeams.push(team);
    }
    return this.getTrackedTeams();
  }

  removeTeam(team: Team): Team[] {
    let idx = this.trackedTeams.findIndex(t => t.id === team.id);
    if (idx >= 0) {
      this.trackedTeams.splice(idx, 1);
    }
    return this.getTrackedTeams();
  }

  getTrackedTeams(): Team[] {
    return this.trackedTeams;
  }
}
