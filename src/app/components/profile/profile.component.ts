import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  rankings: any[];

  constructor(private rankingService: ClubService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.rankingService.getClubsByUser(this.authService.currentUserValue.username)
    .subscribe(p =>
      {
        this.rankings = p.slice();
        console.log(p);
      });
  }


}
