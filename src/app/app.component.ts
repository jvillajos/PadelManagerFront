import { Component } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'PadelManagerFront';
  user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }


}
