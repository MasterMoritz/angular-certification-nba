import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EMPTY, Observable, Subscription, map, mergeMap, of } from 'rxjs';
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
export class TeamResultsComponent implements OnInit, OnDestroy {
  team$: Observable<Team> = EMPTY;
  games$: Observable<Game[]> = of([]);
  teamId?: number;

  private _subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private teamDataService: TeamDataService,
    private gameDataService: GameDataService, private dateService: DateService) { }

  ngOnInit(): void {
    const routeParams: ParamMap = this.route.snapshot.paramMap;
    const teamCode: string = routeParams.get('teamCode') ?? '';
    this.team$ = this.teamDataService.getTeamByCode(teamCode);

    this.team$.pipe(map(team => this.gameDataService.getGamesForTeam(team.id, fromDate, toDate))).subscribe(game$ => this.games$ = game$);
    let toDate: Date = this.dateService.addDays(new Date(), -1);
    let fromDate: Date = this.dateService.addDays(toDate, -11);
     ;
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
}
