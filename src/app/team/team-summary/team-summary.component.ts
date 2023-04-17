import { Component, Input } from '@angular/core';
import { Team } from '../dto/team';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent {
  @Input() team?: Team;

}
