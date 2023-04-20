import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';
import { Game } from '../dto/game';
import { Team } from '../dto/team';

describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;
  let scoreElement: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameScoreComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;

    component.game = testGame;
    scoreElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate winner correctly', () => {
    expect(component.hasTeamWon(testHomeTeam)).toBeFalse();
    expect(component.hasTeamWon(testVisitorTeam)).toBeTrue();
  });
  it('should display teams and score correctly', () => {



    //score
    const gameScoreElement: Element | null = scoreElement.querySelector(`#game-score-${testGame.id}`);
    expect(gameScoreElement).toBeTruthy();
    expect(gameScoreElement?.textContent?.trim()).toEqual(`${testGame.home_team_score} - ${testGame.visitor_team_score}`);

    //home team
    const homeTeamElement: Element | null = scoreElement.querySelector(`#game-score-home-team-${testGame.id}`);
    expect(homeTeamElement).toBeTruthy();
    expect(homeTeamElement?.textContent?.trim()).toEqual(`${testHomeTeam.abbreviation}`);

    //visitor team
    const visitorTeamElement: Element | null = scoreElement.querySelector(`#game-score-visitor-team-${testGame.id}`);
    expect(visitorTeamElement).toBeTruthy();
    expect(visitorTeamElement?.textContent?.trim()).toEqual(`${testVisitorTeam.abbreviation}`);

    //check classes
    expect(homeTeamElement?.classList).toContain('loser-team');
    expect(visitorTeamElement?.classList).toContain('winner-team');

    component.markupTeam = testHomeTeam;
    fixture.detectChanges();
    expect(homeTeamElement?.classList).toContain('loser-team');
    expect(visitorTeamElement?.classList).not.toContain('winner-team');

    component.markupTeam = testVisitorTeam;
    fixture.detectChanges();
    expect(homeTeamElement?.classList).not.toContain('loser-team');
    expect(visitorTeamElement?.classList).toContain('winner-team');
  });

  it('should assign correct winner/loser classes', () => {
    //home team
    const homeTeamElement: Element | null = scoreElement.querySelector(`#game-score-home-team-${testGame.id}`);

    //visitor team
    const visitorTeamElement: Element | null = scoreElement.querySelector(`#game-score-visitor-team-${testGame.id}`);

    //check classes
    expect(homeTeamElement?.classList).toContain('loser-team');
    expect(visitorTeamElement?.classList).toContain('winner-team');

    component.markupTeam = testHomeTeam;
    fixture.detectChanges();
    expect(homeTeamElement?.classList).toContain('loser-team');
    expect(visitorTeamElement?.classList).not.toContain('winner-team');

    component.markupTeam = testVisitorTeam;
    fixture.detectChanges();
    expect(homeTeamElement?.classList).not.toContain('loser-team');
    expect(visitorTeamElement?.classList).toContain('winner-team');

  });
});
const testHomeTeam: Team = {
  "id": 22,
  "abbreviation": "ORL",
  "city": "Orlando",
  "conference": "East",
  "division": "Southeast",
  "full_name": "Orlando Magic",
  "name": "Magic"
}

const testVisitorTeam: Team = {
  "id": 6,
  "abbreviation": "CLE",
  "city": "Cleveland",
  "conference": "East",
  "division": "Central",
  "full_name": "Cleveland Cavaliers",
  "name": "Cavaliers"
}

const testGame: Game = {
  "id": 858554,
  "date": new Date("2023-04-06T00:00:00.000Z"),
  "home_team": testHomeTeam,
  "home_team_score": 94,
  "period": 4,
  "postseason": false,
  "season": 2022,
  "status": "Final",
  "time": "Final",
  "visitor_team": testVisitorTeam,
  "visitor_team_score": 118
}