import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamTrackingComponent } from './team-tracking/team-tracking.component';



@NgModule({
  declarations: [
    TeamDashboardComponent,
    TeamTrackingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeamModule { }
