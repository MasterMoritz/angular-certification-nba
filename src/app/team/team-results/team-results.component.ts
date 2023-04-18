import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeamDataService } from '../service/team-data.service';
import { Team } from '../dto/team';
import { EMPTY, Observable, from, of } from 'rxjs';
import { GameDataService } from '../service/game-data.service';
import { Game } from '../dto/game';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css']
})
export class TeamResultsComponent implements OnInit{
  team$: Observable<Team> = EMPTY;
  games$: Observable<Game[]> = of([]);

  constructor(private route: ActivatedRoute, private teamDataService: TeamDataService, private gameDataService: GameDataService){}

  ngOnInit(): void {
    const routeParams:ParamMap = this.route.snapshot.paramMap;
    const teamCode:number = Number(routeParams.get('teamCode'));
    this.team$ = this.teamDataService.getTeam(teamCode);

    let toDate: Date = new Date();
    toDate.setDate(toDate.getDate() - 1)
    let fromDate: Date = new Date();
    fromDate.setDate(toDate.getDate() - 11);
    this.games$ = this.gameDataService.getGamesForTeam(teamCode, fromDate, toDate, 12);
  }
}
