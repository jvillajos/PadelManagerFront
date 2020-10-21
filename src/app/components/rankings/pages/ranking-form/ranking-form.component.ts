import { Component, Input, OnChanges, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Ranking } from 'src/app/models/Ranking';
import { RankingService } from '../../../../services/ranking.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-ranking-form',
  templateUrl: './ranking-form.component.html',
  styleUrls: ['./ranking-form.component.scss']
})
export class RankingFormComponent  implements OnChanges, OnInit {

  constructor(private rankingService: RankingService,
              private authService: AuthService) { }
  @ViewChild('myModal') myModal;

  title: string;
  action: string;
  rankingId = 0;
  rankingName: string;
  rankingStartDate: Date;
  rankingEndDate: Date;
  isNew: boolean;

  @Output()
    rankingAction = new EventEmitter<boolean>();

  ngOnChanges(changes: any): void {

  }

  ngOnInit(): void {
  }

  open(ranking: Ranking): void {
    this.title = 'Nuevo Ranking';
    this.action = 'Añadir';
    this.isNew = true;
    if (ranking)
    {
      this.isNew = false;
      this.action = 'Actualizar';
      this.title = 'Editar Ranking';
      this.rankingId = ranking.rankingId;
      this.rankingName = ranking.rankingName;
      this.rankingStartDate = ranking.startDate;
      this.rankingEndDate = ranking.endDate;
    }
    this.myModal.open();
  }

  save() {
    const ranking = new Ranking();
    ranking.rankingId = this.rankingId;
    ranking.userName = this.authService.getCurrentUser().userName;
    ranking.rankingName = this.rankingName;
    ranking.description = '';
    ranking.location = '';
    ranking.cp = 0;
    ranking.startDate = this.rankingStartDate;
    ranking.endDate = this.rankingEndDate;
    if (this.isNew) {
      this.rankingService.createRanking(ranking)
                        .subscribe(r => {
                          this.rankingAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
    else {
      this.rankingService.updateRanking(ranking)
                        .subscribe(r => {
                          this.rankingAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
  }

  resetData(): void {
    this.action = undefined;
    this.title = undefined;
    this.rankingName = undefined;
    this.rankingStartDate = undefined;
    this.rankingEndDate = undefined;
  }

}
