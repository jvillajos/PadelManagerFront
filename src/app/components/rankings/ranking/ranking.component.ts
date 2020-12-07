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
import { PhasesService } from '../../../services/phases.service';
import { Phase } from '../../../models/Phase';
import { PhaseFormComponent } from '../pages/phase-form/phase-form.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {
  @ViewChild('coupleForm') coupleForm: CoupleFormComponent;
  @ViewChild('phaseForm') phaseForm: PhaseFormComponent;

  rankingId: number;
  ranking: Ranking;
  rankingUsers: Array<UserInfo>;
  rankingGroups: Array<RankingGroup>;
  couples: Array<Couple>;
  phases: Array<Phase>;

  constructor(private activatedRoute: ActivatedRoute,
              private rankingService: RankingService,
              private userService: UserService,
              private coupleService: CouplesService,
              private phasesService: PhasesService) {
    this.activatedRoute.params.subscribe(params => {
      this.rankingId = params.id;
    });
   }

  ngOnInit(): void {
    this.rankingService.getRankingById(this.rankingId).subscribe(r => {
      this.ranking = r;
      this.rankingGroups = r.groups;
      this.couples = r.couples.sort((a, b) => a.rankingGroupName > b.rankingGroupName ? 1 : -1);
    });
    this.userService.getUsersByRanking(this.rankingId).subscribe(u => {
      this.rankingUsers = u.slice();
    });
    this.phasesService.getPhasesByRankingId(this.rankingId).subscribe(p => {
      this.phases = p.slice();
      console.log(this.phases);
    });
    //this.refreshCouples(true);
  }

  addCouple(): void {
    this.openCoupleForm(undefined);
  }

  editCouple(couple: Couple): void {
    this.openCoupleForm(couple);
  }

  addPhase(): void {
    this.openPhaseForm(undefined);
  }

  editPhase(phase: Phase): void {
    this.openPhaseForm(phase);
  }

  openPhaseForm(phase: Phase) {
    this.phaseForm.open(phase);
  }

  addRankingGroup(): void {
  }

  openCoupleForm(couple: Couple) {
    this.coupleForm.players = this.rankingUsers;
    this.coupleForm.groups = this.rankingGroups;
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

  refreshPhases(event: boolean): void {
    if (event)
    {
      this.phasesService.getPhasesByRankingId(this.rankingId).subscribe(c => {
        this.phases = c.slice();
      });
    }
  }

}
