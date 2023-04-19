import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../dto/team';
import { TeamDataService } from '../service/team-data.service';
import { TeamTrackingService } from '../service/team-tracking.service';

@Component({
  selector: 'app-team-tracking',
  templateUrl: './team-tracking.component.html',
  styleUrls: ['./team-tracking.component.css']
})
export class TeamTrackingComponent implements OnInit {
  teams$!: Observable<Team[]>;
  selectedTeam!: Team;

  constructor(private teamDataService: TeamDataService, private teamTrackingService: TeamTrackingService) {}


  ngOnInit(): void {
    this.teams$ = this.teamDataService.getTeams();
  }

  handleTrackButtonClick(team: Team) {
    if (team) {
      this.teamTrackingService.trackTeam(team);
    }
  }

}
