import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDashboardComponent } from './team/team-dashboard/team-dashboard.component';

const routes: Routes = [
  {path: '', component: TeamDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
