import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changes.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // home atau localhost:4000/
  {
    path: '', // generic path for children
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges]
      }, // tambahin canDeactive : mencegah data yang belum disave  
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ],
  },

  // { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] }, // add guard to protecting url

  { path: '**', redirectTo: '', pathMatch: 'full' }, // ketika typo isi url redirect to home
];
