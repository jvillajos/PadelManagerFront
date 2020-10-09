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
    const username = this.authService.currentUserValue.userName;
    if (username !== undefined) {
      this.rankingService.getClubsByUser(this.authService.currentUserValue.userName)
                        .subscribe(p =>
                        {
                          this.rankings = p.slice();
                          console.log(p);
                        });
    }
  }

  addRanking(): void {
    console.log('Añadir Ranking');
  }



}
