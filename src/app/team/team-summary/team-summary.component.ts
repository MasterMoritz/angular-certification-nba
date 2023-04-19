import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../dto/team';
import { GameDataService } from '../service/game-data.service';
import { Observable, of } from 'rxjs';
import { Game } from '../dto/game';
import { TeamTrackingService } from '../service/team-tracking.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit {
  @Input() team?: Team;
  games$: Observable<Game[]> = of([]);

  constructor(private gameDataService: GameDataService, private teamTrackingService: TeamTrackingService, private dateService: DateService) { }
  ngOnInit(): void {
    let toDate: Date = this.dateService.addDays(new Date(), -1);
    let fromDate: Date = this.dateService.addDays(toDate, -11);
    this.games$ = this.gameDataService.getGamesForTeam(this.team?.id ?? -1, fromDate, toDate);
  }


  hasWonGame(game: Game):boolean {
    const isHomeTeam: boolean = game.home_team.id === this.team?.id;
    return game.home_team_score > game.visitor_team_score === isHomeTeam;
  }

  handleCloseButtonClick(team: Team) {
    this.teamTrackingService.removeTeam(team);
  }
}
