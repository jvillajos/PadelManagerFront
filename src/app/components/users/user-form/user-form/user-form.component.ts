import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserInfo } from '../../../../models/UserInfo';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @ViewChild('myModal') myModal;

  title: string;
  action: string;
  userId = '';
  userName: string;
  playerName: string;
  phoneNumber: string;
  email: string;
  isNew: boolean;

  @Output()
  userFormAction = new EventEmitter<boolean>();


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  open(userInfo: UserInfo): void {
    this.title = 'Nuevo Usuario';
    this.action = 'Añadir';
    this.isNew = true;
    if (userInfo)
    {
      this.isNew = false;
      this.action = 'Actualizar';
      this.title = 'Editar Usuario';
      this.userId = userInfo.id;
      this.userName = userInfo.userName;
      this.playerName = userInfo.playerName;
      this.phoneNumber = userInfo.phoneNumber;
      this.email = userInfo.email;
    }
    this.myModal.open();
  }

  save() {
    const userInfo = new UserInfo();
    userInfo.userName = this.userName;
    userInfo.playerName = this.playerName;
    userInfo.email = this.email;
    userInfo.phoneNumber = this.phoneNumber;
    userInfo.password = 'Cambiar1!';
    if (this.isNew) {
      this.userService.createUser(userInfo)
                        .subscribe(r => {
                          this.userFormAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
    else {
      this.userService.updateUser(userInfo)
                        .subscribe(r => {
                          this.userFormAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
  }

  resetData(): void {
    this.action = undefined;
    this.title = undefined;
    this.userName = undefined;
    this.playerName = undefined;
    this.email = undefined;
    this.phoneNumber = undefined;
    this.userId = undefined;
  }

}
