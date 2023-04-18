import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../dto/team';
import { GameDataService } from '../service/game-data.service';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Game } from '../dto/game';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit {
  @Input() team?: Team;
  games$: Observable<Game[]> = of([]);

  constructor(private gameDataService: GameDataService) { }
  ngOnInit(): void {
    let toDate: Date = new Date();
    toDate.setDate(toDate.getDate() - 1)
    let fromDate: Date = new Date();
    fromDate.setDate(toDate.getDate() - 11);
    this.games$ = this.gameDataService.getGamesForTeam(this.team?.id ?? -1, fromDate, toDate, 12);
  }


  hasWonGame(game: Game):boolean {
    console.log(3)
    const isHomeTeam: boolean = game.home_team.id === this.team?.id;
    return game.home_team_score > game.visitor_team_score === isHomeTeam;
  }
}
