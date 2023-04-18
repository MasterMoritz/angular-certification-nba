import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDashboardComponent } from './team/team-dashboard/team-dashboard.component';
import { TeamResultsComponent } from './team/team-results/team-results.component';

const routes: Routes = [
  {path: 'results/:teamCode', component: TeamResultsComponent},
  {path: '', component: TeamDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
