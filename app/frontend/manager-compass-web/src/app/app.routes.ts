import { Routes } from '@angular/router';
import { AssistantComponent } from './components/assistant/assistant.component';
import { PeopleSnapshotComponent } from './components/people-snapshot/people-snapshot.component';
import { PlaybooksComponent } from './components/playbooks/playbooks.component';
import { EscalationComponent } from './components/escalation/escalation.component';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { DataExplorerComponent } from './components/data-explorer/data-explorer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'assistant', pathMatch: 'full' },
  { path: 'assistant', component: AssistantComponent },
  { path: 'snapshot', component: PeopleSnapshotComponent },
  { path: 'playbooks', component: PlaybooksComponent },
  { path: 'escalation', component: EscalationComponent },
  { path: 'leadership', component: LeadershipComponent },
  { path: 'adoption', component: AdoptionComponent },
  { path: 'explorer', component: DataExplorerComponent },
  { path: '**', redirectTo: 'assistant' }
];
