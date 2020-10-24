import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from '../../../services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: [
  ]
})
export class RankingComponent implements OnInit {
  rankingId: number;
  ranking: any;

  constructor(private activatedRoute: ActivatedRoute,
              private rankingService: RankingService) {
    this.activatedRoute.params.subscribe(params => {
      this.rankingId = params.id;
    });
   }

  ngOnInit(): void {
    this.rankingService.getRankingById(this.rankingId).subscribe(r => {
      this.ranking = r;
      console.log(this.ranking);
    });
  }

}
