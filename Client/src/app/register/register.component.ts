import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  // @Input() valuesFromHome: any; --properto untuk api
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        // console.log('registration successfull');
        this.alertify.success('Registration berhasil');
      },
      (error) => {
        // console.log(error);
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false); // all we can emit is the value of false
    console.log('cancelled');
  }
}
