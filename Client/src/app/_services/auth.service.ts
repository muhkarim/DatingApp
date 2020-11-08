import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService(); // add jwt helper
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../asset/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  // func ketika ubah main photo
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token); // set token dan disimpan di inspect local storage (token jwt)
          localStorage.setItem('user', JSON.stringify(user.user)); // convert to string
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;

          this.changeMemberPhoto(this.currentUser.photoUrl);
          // console.log(this.decodedToken);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token); // return boolean, jika token not expired return true.  sebaliknya else
  }
}
