import { Component, OnInit } from '@angular/core';
import { Phase } from 'src/app/models/Phase';
import { PhasesService } from 'src/app/services/phases.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  rankingPhases: Array<Phase>;
  private currentPhase: Phase;
  rankingId: number;

  constructor(private phasesService: PhasesService) {
    this.rankingId = 1;
    this.currentPhase = null;
   }

  ngOnInit(): void {
    this.phasesService.getPhasesByRankingId(this.rankingId)
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

  set SelectedPhase(phase: Phase)
  {
      this.currentPhase = phase;
  }

}
