import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ɵɵpureFunctionV } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // menambhkan library httpclient untuk API
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // router
// import { JwtModule } from '@auth0/angular-jwt'; // libary jwt client
// import { NgxGalleryModule } from 'ngx-gallery';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes'; // configuration router
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

// export function tokenGetter() {
//   return localStorage.getItem('token');
// }

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),

    // NgxGalleryModule,

    // JwtModule.forRoot({
    //   config: {
    //     // tslint:disable-next-line: object-literal-shorthand
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:4200'],
    //     blacklistedRoutes: ['localhost:44316/api/auth']
    //   }
    // })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
