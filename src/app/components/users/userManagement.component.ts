import { Component, OnInit, PipeTransform } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../models/UserInfo';
import { AlertService } from '../../services/alert.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './userManagement.component.html',
})
export class UserManagementComponent implements OnInit {

  users: Array<UserInfo>;
  filteredUsers: Observable<UserInfo[]>;
  selectedUser: UserInfo;
  filter = new FormControl();

  constructor(private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(users => {
        this.users = users.slice();
        this.filteredUsers = this.filter.valueChanges.pipe(startWith(''),
                                                          map(text => this.searchData(text))
        );
        console.log(this.users);
      }, err => this.alertService.error(err));
  }

  onSelect(userInfo: UserInfo){
    this.selectedUser = userInfo;
  }

  searchData(searchValue: string): UserInfo[] {
    return this.users.filter(u => {
      const term = searchValue.toLowerCase();
      return u.playerName.toLowerCase().includes(term);
    });
  }

  deleteUser(userInfo: UserInfo){
  }

}
