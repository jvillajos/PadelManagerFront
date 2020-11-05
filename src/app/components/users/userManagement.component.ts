import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../models/UserInfo';
import { AlertService } from '../../services/alert.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserFormComponent } from './user-form/user-form/user-form.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './userManagement.component.html',
  styleUrls: ['./userManagement.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('userForm') userForm: UserFormComponent;

  users: Array<UserInfo>;
  filteredUsers: UserInfo[];
  selectedUser: UserInfo;
  private _page = 1;
  private _pageSize = 20;
  private _searchValue = '';
  collectionSize = 0;

  get page(): number {
    return this._page;
  }
  set page(value: number) {
    if (value !== this._page) {
      this._page = value;
      this.refreshData();
    }
  }

  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: number) {
    if (value !== this._pageSize) {
      this._pageSize = value;
      this.refreshData();
    }
  }

  get searchValue(): string {
    return this._searchValue;
  }
  set searchValue(value: string) {
    if (value !== this._searchValue) {
      this._searchValue = value;
      this.refreshData();
    }
  }


  constructor(private userService: UserService,
              private alertService: AlertService) {
    this._page = 1;
    this._pageSize = 15;
  }

  ngOnInit(): void {
    this.refresh(true);
  }

  onSelect(userInfo: UserInfo){
    this.selectedUser = userInfo;
  }

  refreshData(): void {
    // filter
    const result = this.users.filter(u => {
      const term = this.searchValue.toLowerCase();
      return u.playerName.toLowerCase().includes(term);
    });
    this.collectionSize = result.length;

    // 3. paginate
    this.filteredUsers = result.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  refresh(event: boolean){
    if (event){
      this.userService.getAllUsers()
      .subscribe(users => {
          this.users = users.slice();
          this.refreshData();
        }, err => this.alertService.error(err));
    }
  }

  deleteUser(userInfo: UserInfo){
  }

  editUser(userInfo: UserInfo) {
    this.openForm(userInfo);
  }

  addUser() {

  }


  openForm(userInfo: UserInfo) {
    if (!userInfo){
      this.userForm.open(undefined);
    }
    else {
      this.userForm.open(userInfo);
    }
  }

}
