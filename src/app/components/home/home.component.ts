import { Component, OnInit } from '@angular/core';
import { Phase } from 'src/app/models/Phase';
import { RankingGroup } from '../../models/RankingGroup';
import { RankingService } from '../../services/ranking.service';
import { AuthService } from '../auth/auth.service';
import { PhasesService } from '../../services/phases.service';
import { Match } from 'src/app/models/Match';
import { MatchModel } from './models/MatchModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rankingGroups: Array<RankingGroup>;
  rankingPhases: Array<Phase>;
  matches: Array<Match>;
  rankingGroupMatches: Array<MatchModel>;
  rankingId: number;
  phaseId: number;
  private currentPhase: Phase;
  private currentRankingGroup: RankingGroup;
  

  constructor(private rankingService: RankingService,
              private phasesService: PhasesService,
              private authService: AuthService) {
    this.rankingGroups = new Array<RankingGroup>();
    this.rankingId = 1;
    this.currentPhase = null;
    this.currentRankingGroup = null;
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
                            this.SelectedRankingGroup = this.rankingGroups[0]
                            this.GetPhases(this.rankingId);
                          }
                        });
    }
  }

  onMatchEditingChanged(anyInEdition: boolean) {
    this.rankingGroupMatches.forEach(f => {
      if (!anyInEdition){
        f.isEnabled = true;
      }
      else{
        if (!f.isEditing) {
          f.isEnabled = false;
        }
        else {
          f.isEnabled = true;
        }
      }
    })
  }

  rankingGroupChanged(rankingGroup: RankingGroup) {
    this.SelectedRankingGroup = rankingGroup;
  }


  private GetMatches(phase: Phase, rankingGroup: RankingGroup) {
    if (phase!==null) {
      this.phasesService.getMatchesByPhase(phase.id)
      .subscribe(m => {
        this.matches = m.slice();
        if (rankingGroup){
          this.rankingGroupMatches = this.matches
                                          .filter(m => m.rankingGroupId === rankingGroup.id)
                                          .map(f => new MatchModel(f,true)); 
        }
      });
    }
    
  }

  private GetPhases(rankingId: number) {
    this.phasesService.getPhasesByRankingId(rankingId)
      .subscribe(p => {
        this.rankingPhases = p.slice();
        if (this.rankingPhases.length > 0){
          this.SelectedPhase = this.rankingPhases[0];
        }
      });
  }

  get SelectedPhase(): Phase
  {
      return this.currentPhase;
  }

  get SelectedRankingGroup(): RankingGroup
  {
    return this.currentRankingGroup;
  }

  
  set SelectedRankingGroup(rankingGroup: RankingGroup)
  {
    this.currentRankingGroup = rankingGroup;
    this.GetMatches(this.currentPhase, this.SelectedRankingGroup);
  }

  set SelectedPhase(phase: Phase)
  {
      this.currentPhase = phase;
      this.GetMatches(this.currentPhase, this.SelectedRankingGroup);
  }
}
