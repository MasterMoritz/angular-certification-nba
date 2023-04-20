import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamResultsComponent } from './team-results.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { TeamDataService } from '../service/team-data.service';
import { Team } from '../dto/team';
import { EMPTY, Observable, of } from 'rxjs';
import { GameDataService } from '../service/game-data.service';
import { Game } from '../dto/game';

describe('TeamResultsComponent', () => {
  let component: TeamResultsComponent;
  let fixture: ComponentFixture<TeamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TeamResultsComponent,
        TeamTrackingStubComponent,
      ],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: TeamDataService, useValue: teamDataServiceStub }, { provide: GameDataService, useValue: gameDataServiceStub }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//stubs
@Component({ selector: 'app-team-tracking', template: '' })
class TeamTrackingStubComponent { }

let teamDataServiceStub: Partial<TeamDataService>;
teamDataServiceStub = {
  getTeams(): Observable<Team[]> {
    return of([])
  },
  getTeam(id: number): Observable<Team> {
    return EMPTY
  },
}
let gameDataServiceStub: Partial<GameDataService>;
gameDataServiceStub = {
  getGamesForTeam(teamId: number, fromDate: Date, toDate: Date, resultLimit?: number): Observable<Game[]> {
    return of([])
  },
}