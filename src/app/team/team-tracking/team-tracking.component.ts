import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamDataService } from '../service/team-data.service';
import { Observable } from 'rxjs';
import { Team } from '../dto/team';

@Component({
  selector: 'app-team-tracking',
  templateUrl: './team-tracking.component.html',
  styleUrls: ['./team-tracking.component.css']
})
export class TeamTrackingComponent implements OnInit {
  teams$!: Observable<Team[]>;
  teams: Team[] = [];

  constructor(private teamDataService: TeamDataService) {}


  ngOnInit(): void {
    this.teams$ = this.teamDataService.getTeams();
  }


}
