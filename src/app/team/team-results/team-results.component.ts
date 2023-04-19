import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { Game } from '../dto/game';
import { Team } from '../dto/team';
import { GameDataService } from '../service/game-data.service';
import { TeamDataService } from '../service/team-data.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css']
})
export class TeamResultsComponent implements OnInit {
  team$: Observable<Team> = EMPTY;
  games$: Observable<Game[]> = of([]);

  constructor(private route: ActivatedRoute, private teamDataService: TeamDataService, private gameDataService: GameDataService, private dateService: DateService) { }

  ngOnInit(): void {
    const routeParams: ParamMap = this.route.snapshot.paramMap;
    const teamCode: number = Number(routeParams.get('teamCode'));
    this.team$ = this.teamDataService.getTeam(teamCode);

    let toDate: Date = this.dateService.addDays(new Date(), -1);
    let fromDate: Date = this.dateService.addDays(toDate, -11);
    this.games$ = this.gameDataService.getGamesForTeam(teamCode, fromDate, toDate);
  }
}
