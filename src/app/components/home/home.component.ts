import { Component, OnInit } from '@angular/core';
import { Phase } from 'src/app/models/Phase';
import { RankingGroup } from '../../models/RankingGroup';
import { RankingService } from '../../services/ranking.service';
import { AuthService } from '../auth/auth.service';
import { PhasesService } from '../../services/phases.service';
import { Match } from 'src/app/models/Match';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  rankingGroups: Array<RankingGroup>;
  rankingPhases: Array<Phase>;
  matches: Array<Match>;
  rankingGroupMatches: Array<Match>;
  rankingId: number;
  phaseId: number;
  private currentPhase: Phase;

  constructor(private rankingService: RankingService,
              private phasesService: PhasesService,
              private authService: AuthService) {
    this.rankingGroups = new Array<RankingGroup>();
    this.rankingId = 1;
   }

  ngOnInit(): void {
    const username = this.authService.currentUserValue.userName;
    if (username !== undefined) {
      this.rankingService.getRankingGroupsByUser(username)
                        .subscribe(p =>
                        {
                          this.rankingGroups = p.slice();
                          console.log('Ranking Groups');
                          console.log(this.rankingGroups);
                          if (this.rankingGroups.length > 0)
                          {
                            this.rankingGroups[0].active = true;
                            this.GetPhases(this.rankingId);
                          }
                        });
    }
  }


  private GetMatches(phaseId: number) {
    this.phasesService.getMatchesByPhase(2)
      .subscribe(m => {
        this.matches = m.slice();
        this.matches.forEach(m => {
            m.couple1.displayName = m.couple1.displayName.split(' - ');
            m.couple2.displayName = m.couple2.displayName.split(' - ');

            
        });
        if (this.rankingGroups.length > 0 && this.rankingGroups[0].active){
          this.rankingGroupMatches = this.matches.filter(m => m.rankingGroupId === this.rankingGroups[0].id);

          console.log(this.rankingGroupMatches);
        }
        console.log(this.matches);
      });
  }

  private GetPhases(rankingId: number) {
    this.phasesService.getPhasesByRankingId(rankingId)
      .subscribe(p => {
        this.rankingPhases = p.slice();
        if (this.rankingPhases.length > 0){
          this._selectedPhase = this.rankingPhases[0];
        }
      });
  }

  private get _selectedPhase(): Phase
  {
      return this.currentPhase;
  }

  private set _selectedPhase(phase: Phase)
  {
      this.currentPhase = phase;
      this.GetMatches(this.currentPhase.id);
  }
}
