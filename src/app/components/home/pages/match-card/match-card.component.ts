import { Component, Input, OnInit } from '@angular/core';
import { PhasesService } from 'src/app/services/phases.service';
import { Match } from '../../../../models/Match';

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
    this.isEditing = false
    this.incident = this.incidents[0];
  }

  @Input()
  data: Match;

  saveMatch()  {
      this.phasesService.updateMatch(this.data).subscribe(r => {
        this.isEditing =false;
      });
  }

  cancelSave()
  {
    this.isEditing = false;
  }

}
