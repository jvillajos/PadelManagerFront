import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PhasesService } from 'src/app/services/phases.service';
import { Phase } from 'src/app/models/Phase';

@Component({
  selector: 'app-phase-form',
  templateUrl: './phase-form.component.html'
})
export class PhaseFormComponent implements OnInit {

  constructor(private phasesService: PhasesService) { }
  @ViewChild('myModal') myModal;

  title: string;
  action: string;
  phaseId = 0;
  phaseName: string;
  rankingId: number;
  startDate: Date;
  endDate: Date;
  selectedPlayers: string[];
  selectedGroup: number;
  isNew: boolean;

  @Output()
  phaseAction = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  open(phase: Phase): void {
    this.title = 'Nueva Fase';
    this.action = 'Añadir';
    this.isNew = true;
    if (phase)
    {
      this.isNew = false;
      this.action = 'Actualizar';
      this.title = 'Editar Pareja';
      this.phaseId = phase.id;
      this.phaseName = phase.name;
      this.startDate = phase.startDate;
      this.endDate = phase.endDate;
    }
    this.myModal.open();
  }

  save() {
    const phase = new Phase();
    phase.id = this.phaseId;
    phase.name = this.phaseName;
    phase.rankingId = this.rankingId;
    if (this.isNew) {
      this.phasesService.addPhaseToRanking(phase)
                        .subscribe(r => {
                          this.phaseAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
    else {
      this.phasesService.updatePhaseToRanking(phase)
                        .subscribe(r => {
                          this.phaseAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
  }

  resetData(): void {
    this.action = undefined;
    this.title = undefined;
    this.phaseId = undefined;
    this.phaseName = undefined;
  }
}
