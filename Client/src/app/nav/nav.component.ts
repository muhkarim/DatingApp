import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Login berhasil');
      },
      (error) => {
        this.alertify.error('Gagal Login');
      },
      () => {
        this.router.navigate(['/lists']); // add new parameter in subscribe with no parameter
      }
    );
  }

  // ketika user sudah login
  loggedIn() {
    const token = localStorage.getItem('token'); // mengambil item token di localStorage (inspect)
    return !!token; // shorthand if else ketika berisi token true dan jika empty false (boolean)
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);

    // console.log('logged out');
  }
}
