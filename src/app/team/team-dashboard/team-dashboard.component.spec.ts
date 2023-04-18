import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDashboardComponent } from './team-dashboard.component';
import { Component } from '@angular/core';

describe('TeamDashboardComponent', () => {
  let component: TeamDashboardComponent;
  let fixture: ComponentFixture<TeamDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TeamDashboardComponent,
        TeamTrackingStubComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamDashboardComponent);
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