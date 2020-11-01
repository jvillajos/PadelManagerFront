import { Component, OnInit } from '@angular/core';
import { RankingGroup } from '../../models/RankingGroup';
import { RankingService } from '../../services/ranking.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  rankingGroups: Array<RankingGroup>;
  constructor(private rankingService: RankingService,
              private authService: AuthService) {
    this.rankingGroups = new Array<RankingGroup>();
   }

  ngOnInit(): void {
    const username = this.authService.currentUserValue.userName;
    if (username !== undefined) {
      this.rankingService.getRankingGroupsByUser(username)
                        .subscribe(p =>
                        {
                          this.rankingGroups = p.slice();
                          if (this.rankingGroups.length > 0)
                          {
                            this.rankingGroups[0].active = true;
                          }
                        });
    }
    
    const ranking1 = new RankingGroup();
    ranking1.id = 1;
    ranking1.name = 'Grupo 2';
    ranking1.category = 2;

    const ranking2 = new RankingGroup();
    ranking2.id = 2;
    ranking2.name = 'Grupo 4';
    ranking2.category = 4;
    this.rankingGroups.push(ranking1);
    this.rankingGroups.push(ranking2);
  }

}
