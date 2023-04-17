import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTrackingComponent } from './team-tracking.component';

describe('TeamTrackingComponent', () => {
  let component: TeamTrackingComponent;
  let fixture: ComponentFixture<TeamTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTrackingComponent ]
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
