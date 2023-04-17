import { Component, OnInit } from '@angular/core';
import { TeamTrackingService } from '../service/team-tracking.service';
import { Team } from '../dto/team';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {
  teams: Team[] = [];
  constructor(private teamTrackingService: TeamTrackingService) {}
  ngOnInit(): void {
    this.teams = this.teamTrackingService.getTrackedTeams();
  }

}
