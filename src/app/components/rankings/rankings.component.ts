import { Component, OnInit,ViewChild } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ranking } from 'src/app/models/Ranking';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RankingFormComponent } from './pages/ranking-form/ranking-form.component';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  @ViewChild('rankingForm') rankingForm: RankingFormComponent;
  rankings: any[];

  constructor(private rankingService: ClubService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    }

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



}
