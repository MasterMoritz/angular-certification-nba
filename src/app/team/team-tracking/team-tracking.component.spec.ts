import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTrackingComponent } from './team-tracking.component';
import { TeamDataService } from '../service/team-data.service';
import { Observable, of } from 'rxjs';
import { Team } from '../dto/team';
import { FormsModule } from '@angular/forms';

describe('TeamTrackingComponent', () => {
  let component: TeamTrackingComponent;
  let fixture: ComponentFixture<TeamTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TeamTrackingComponent ],
      providers: [ { provide: TeamDataService, useValue: teamDataServiceStub } ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//stubs
let teamDataServiceStub: Partial<TeamDataService>;
teamDataServiceStub = {
  getTeams():Observable<Team[]> {
    return of([])
  },
}
