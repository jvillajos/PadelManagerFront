import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ranking } from 'src/app/models/Ranking';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RankingFormComponent } from './pages/ranking-form/ranking-form.component';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  rankingForm: FormGroup;
  rankings: any[];

  constructor(private rankingService: ClubService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private modal: NgbModal) {
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

  openForm(ranking: Ranking) {
    if (!ranking){
      this.modal.open(RankingFormComponent);
    }
    else {

    }
  }



}
