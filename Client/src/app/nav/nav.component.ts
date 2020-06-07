import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Login berhasil');
      },
      (error) => {
        console.log('Gagal Login');
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
    console.log('logged out');
  }
}
