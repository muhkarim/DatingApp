import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  // values: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.getValues();
  }

  registerToggle() {
    this.registerMode = true;
  }

  // getValues() {
  //   this.http.get('https://localhost:44316/api/values').subscribe(
  //     (response) => {
  //       this.values = response; // memberikan response kepada values
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}