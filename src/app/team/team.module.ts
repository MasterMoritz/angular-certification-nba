import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamTrackingComponent } from './team-tracking/team-tracking.component';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import {FormsModule} from '@angular/forms';
import { AverageScorePipe } from './pipe/average-score.pipe';
import { TeamResultsComponent } from './team-results/team-results.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    TeamDashboardComponent,
    TeamTrackingComponent,
    TeamSummaryComponent,
    AverageScorePipe,
    TeamResultsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ]
})
export class TeamModule { }
