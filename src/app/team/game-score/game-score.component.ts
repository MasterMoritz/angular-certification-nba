import { Component, Input } from '@angular/core';
import { Game } from '../dto/game';
import { EMPTY, Observable } from 'rxjs';
import { Team } from '../dto/team';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css']
})
export class GameScoreComponent {
  @Input() game?: Game;
  @Input() markupTeam?: Team;

  shouldAddMarkupClassForTeam(team: Team): boolean {
    return !this.markupTeam || this.markupTeam.id === team.id;
  }
  hasTeamWon(team: Team): boolean {
    if (!this.game) return false;
    const isHomeTeam: boolean = this.game.home_team.id === team.id;
    return this.game.home_team_score > this.game.visitor_team_score === isHomeTeam;
  }
}
