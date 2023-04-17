import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamTrackingComponent } from './team-tracking/team-tracking.component';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    TeamDashboardComponent,
    TeamTrackingComponent,
    TeamSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class TeamModule { }
