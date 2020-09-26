import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  isLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.authService.isLogin.subscribe(x => this.isLogin = x);
  }

}
