import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../dto/game';

/**
 * Calculates the average score in the games for a certain team id.
 * If the team was the home team, then the home score of a game will be considered. If the team was the visitor team, then the visitor score of a game will be considered.
 */
@Pipe({
  name: 'averageScore'
})
export class AverageScorePipe implements PipeTransform {
  /**
   * @param games The games from which the average score will be calculated
   * @param teamId The team for which the average score will be calculated
   * @param inverseTeam If true, the average score will be calculated from the other teams. Effectively calculating the average of 'conceded' score.
   * @returns 
   */
  transform(games: Game[], teamId: number, inverseTeam?: boolean): number {
    return games.reduce((runningAverage, game, idx) => {

      let currentScore: number = (game.home_team.id === teamId === !inverseTeam ? game.home_team_score : game.visitor_team_score);
      return runningAverage + (currentScore - runningAverage) / (idx + 1)
    }, 0);
  }

}
