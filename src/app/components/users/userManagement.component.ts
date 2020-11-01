import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../models/UserInfo';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './userManagement.component.html',
})
export class UserManagementComponent implements OnInit {

  users: Array<UserInfo>;
  selectedUser: UserInfo;
  constructor(private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(users => {
        this.users = users.slice();
        console.log(this.users);
      }, err => this.alertService.error(err));
  }

  onSelect(userInfo: UserInfo){
    this.selectedUser = userInfo;
  }

  deleteUser(userInfo: UserInfo){
    
  }

}
