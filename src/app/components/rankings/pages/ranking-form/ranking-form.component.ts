import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Ranking } from 'src/app/models/Ranking';

@Component({
  selector: 'app-ranking-form',
  templateUrl: './ranking-form.component.html',
  styleUrls: ['./ranking-form.component.scss']
})
export class RankingFormComponent  implements OnChanges, OnInit {
  @ViewChild('myModal') myModal;

  rankingName: string;
  rankingStartDate: Date;
  rankingEndDate: Date;

  constructor() { }

  ngOnChanges(changes: any): void {

  }

  ngOnInit(): void {
  }

  open(ranking: Ranking): void {
    if (ranking)
    {
      this.rankingName = ranking.name;
      this.rankingStartDate = ranking.StartDate;
      this.rankingEndDate = ranking.EndDate;
    }
    this.myModal.open();
  }


}
