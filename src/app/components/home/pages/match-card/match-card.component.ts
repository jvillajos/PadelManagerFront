import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhasesService } from 'src/app/services/phases.service';
import { Match } from '../../../../models/Match';
import { MatchModel } from '../../models/MatchModel';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {

  isEditing: boolean;
  incidents:string[]=["Sin incidentes","Partido no jugado","Pareja A no presentado","Pareja B no presentado"];
  incident: string;
  constructor(private phasesService: PhasesService) { }

  ngOnInit(): void {
    this.incident = this.incidents[0];
  }

  @Input()
  data: MatchModel;

  @Output()
  editingStarted: EventEmitter<boolean> = new EventEmitter();

  editMatch() {
    this.data.isEditing = true;
    this.editingStarted.emit(true);
  }

  saveMatch()  {
      this.phasesService.updateMatch(this.data.match).subscribe(r => {
        this.data.isEditing =false;
        this.editingStarted.emit(false);
      }, err => {
        this.data.isEditing = false;
        this.editingStarted.emit(false);
      });
  }

  cancelSave()
  {
    this.data.isEditing = false;
    this.editingStarted.emit(false);
  }

}
