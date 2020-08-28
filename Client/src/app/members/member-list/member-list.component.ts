import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service'; // lower level inside folder
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  usersObj: User[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute // jika pakai resolver
  ) { }


  // tarik data menggunakan resolver
  ngOnInit(): void {
    // this.loadUsers();

    this.route.data.subscribe(data => {
      this.usersObj = data['users'];
    });
  }

  // == tarik data pakai cara biasa
  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.usersObj = users;
  //     },
  //     (error) => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
