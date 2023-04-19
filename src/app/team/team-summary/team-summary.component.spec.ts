import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSummaryComponent } from './team-summary.component';
import { GameDataService } from '../service/game-data.service';
import { Game } from '../dto/game';
import { Observable, of } from 'rxjs';

describe('TeamSummaryComponent', () => {
  let component: TeamSummaryComponent;
  let fixture: ComponentFixture<TeamSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamSummaryComponent],
      providers: [{ provide: GameDataService, useValue: gameDataServiceStub }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//stubs
let gameDataServiceStub: Partial<GameDataService>;
gameDataServiceStub = {
  getGamesForTeam(teamId: number, fromDate: Date, toDate: Date, resultLimit?: number): Observable<Game[]> {
    return of([])
  },
}