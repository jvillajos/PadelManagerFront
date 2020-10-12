import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Ranking } from 'src/app/models/Ranking';
import { RankingService } from '../../../../services/ranking.service';

@Component({
  selector: 'app-ranking-form',
  templateUrl: './ranking-form.component.html',
  styleUrls: ['./ranking-form.component.scss']
})
export class RankingFormComponent  implements OnChanges, OnInit {
  @ViewChild('myModal') myModal;

  title: string;
  action: string;
  rankingName: string;
  rankingStartDate: Date;
  rankingEndDate: Date;

  constructor(private rankingService: RankingService) { }

  ngOnChanges(changes: any): void {

  }

  ngOnInit(): void {
  }

  open(ranking: Ranking): void {
    this.title = 'Nuevo Ranking';
    this.action = 'Añadir';
    if (ranking)
    {
      this.action = 'Actualizar';
      this.title = 'Editar Ranking';
      this.rankingName = ranking.rankingName;
      this.rankingStartDate = ranking.startDate;
      this.rankingEndDate = ranking.endDate;
    }
    this.myModal.open();
  }

  save() {
    const ranking = new Ranking();
    ranking.rankingId = 0;
    ranking.userName = '';
    ranking.rankingName = this.rankingName;
    ranking.description = '';
    ranking.location = '';
    ranking.cp = 0;
    ranking.startDate = this.rankingStartDate;
    ranking.endDate = this.rankingEndDate;
    this.rankingService.createRanking(ranking);
  }

  resetData(): void {
    this.action = undefined;
    this.title = undefined;
    this.rankingName = undefined;
    this.rankingStartDate = undefined;
    this.rankingEndDate = undefined;
  }


}
