import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // home atau localhost:4000/
  {
    path: '', // generic path for children
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ],
  },

  // { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] }, // add guard to protecting url

  { path: '**', redirectTo: '', pathMatch: 'full' }, // ketika typo isi url redirect to home
];