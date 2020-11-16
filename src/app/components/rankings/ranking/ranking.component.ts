import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from '../../../services/ranking.service';
import { RankingGroup } from '../../../models/RankingGroup';
import { Couple } from '../../../models/Couple';
import { UserService } from '../../../services/user.service';
import { UserInfo } from '../../../models/UserInfo';
import { CoupleFormComponent } from '../pages/couple-form/couple-form.component';
import { CouplesService } from 'src/app/services/couples.service';
import { Ranking } from '../../../models/Ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {
  @ViewChild('coupleForm') coupleForm: CoupleFormComponent;

  rankingId: number;
  ranking: Ranking;
  rankingUsers: Array<UserInfo>;
  rankingGroups: Array<RankingGroup>;
  couples: Array<Couple>;

  constructor(private activatedRoute: ActivatedRoute,
              private rankingService: RankingService,
              private userService: UserService,
              private coupleService: CouplesService) {
    this.activatedRoute.params.subscribe(params => {
      this.rankingId = params.id;
    });
   }

  ngOnInit(): void {
    this.rankingService.getRankingById(this.rankingId).subscribe(r => {
      this.ranking = r;
      this.rankingGroups = r.groups;
      console.log(this.ranking);
    });
    this.userService.getUsersByRanking(this.rankingId).subscribe(u => {
      this.rankingUsers = u.slice();
    });
    this.refreshCouples(true);
  }

  addCouple(): void {
    this.openCoupleForm(undefined);
  }

  editCouple(couple: Couple): void {
    this.openCoupleForm(couple);
  }

  addRankingGroup(): void {
  }

  openCoupleForm(couple: Couple) {
    this.coupleForm.players = this.rankingUsers;
    this.coupleForm.rankingId = this.rankingId;
    if (!couple){
      this.coupleForm.open(undefined);
    }
    else {
      this.coupleForm.open(couple);
    }
  }

  refreshCouples(event: boolean): void {
    if (event)
    {
      this.coupleService.getCouplesByRanking(this.rankingId).subscribe(c => {
        this.couples = c.slice();
      });
    }
  }

}
