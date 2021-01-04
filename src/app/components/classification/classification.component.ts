import { Component, OnInit } from '@angular/core';
import { ClassificationDto } from 'src/app/models/Classification';
import { Phase } from 'src/app/models/Phase';
import { PhasesService } from 'src/app/services/phases.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  rankingPhases: Array<Phase>;
  private currentPhase: Phase;
  rankingId: number;
  classificationLines: ClassificationDto[];

  constructor(private phasesService: PhasesService,
             private alertService: AlertService) {
    this.rankingId = 1;
    this.currentPhase = null;
   }

  ngOnInit(): void {
    this.phasesService.getPhasesByRankingId(this.rankingId)
      .subscribe(p => {
        this.rankingPhases = p.slice();
        if (this.rankingPhases.length > 0){
          this.SelectedPhase = this.rankingPhases[this.rankingPhases.length -1];
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
      console.log(this.currentPhase);
      if (this.currentPhase != null){
        this.phasesService.getClassifications(this.currentPhase.id)
        .subscribe(c => {
          this.classificationLines = c.slice();
        },
        err => {
            return this.alertService.success("Classificación no disponible");
        });
      }
      

  }

}
