import { Component, OnInit, ViewChild } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ranking } from 'src/app/models/Ranking';
import { RankingFormComponent } from './pages/ranking-form/ranking-form.component';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  @ViewChild('rankingForm') rankingForm: RankingFormComponent;
  rankings: Ranking[];

  constructor(private rankingService: RankingService,
              private authService: AuthService) {
    }

  ngOnInit(): void {
    const username = this.authService.currentUserValue.userName;
    if (username !== undefined) {
      this.rankingService.getRankingsByUser(this.authService.currentUserValue.userName)
                        .subscribe(p =>
                        {
                          this.rankings = p.slice();
                          console.log(p);
                        });
    }
  }

  addRanking(): void {
    this.openForm(undefined);
    console.log('Añadir Ranking');
  }

  editRanking(ranking: any): void {
    this.openForm(ranking);
  }

  openForm(ranking: Ranking) {
    if (!ranking){
      this.rankingForm.open(undefined);
    }
    else {
      this.rankingForm.open(ranking);
    }
  }

  refresh(event: boolean){
    if (event) {
      const username = this.authService.currentUserValue.userName;
      if (username !== undefined) {
        this.rankingService.getRankingsByUser(this.authService.currentUserValue.userName)
                          .subscribe(p =>
                          {
                            this.rankings = p.slice();
                            console.log(p);
                          });
      }
    }
  }



}
