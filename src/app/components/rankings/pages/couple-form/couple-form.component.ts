import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Couple } from 'src/app/models/Couple';
import { CouplesService } from '../../../../services/couples.service';
import { UserInfo } from 'src/app/models/UserInfo';
import { RankingGroup } from '../../../../models/RankingGroup';

@Component({
  selector: 'app-couple-form',
  templateUrl: './couple-form.component.html'
})
export class CoupleFormComponent implements OnInit {

  constructor(private couplesService: CouplesService) { }
  @ViewChild('myModal') myModal;

  title: string;
  action: string;
  coupleId = 0;
  coupleName: string;
  players: UserInfo[];
  selectedPlayers: string[];
  selectedGroup: number;
  isNew: boolean;

  @Input()
  rankingId: number;

  @Input()
  groups: RankingGroup[];

  @Output()
  coupleAction = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  open(couple: Couple): void {
    this.title = 'Nueva Pareja';
    this.action = 'Añadir';
    this.isNew = true;
    if (couple)
    {
      this.isNew = false;
      this.action = 'Actualizar';
      this.title = 'Editar Pareja';
      this.coupleId = couple.id;
      this.selectedGroup = couple.rankingGroupId;
      this.coupleName = couple.name;
      this.selectedPlayers = couple.users.map(u => u.id);
    }
    this.myModal.open();
  }

  save() {
    const couple = new Couple();
    couple.id = this.coupleId;
    couple.name = this.coupleName;
    couple.rankingId = this.rankingId;
    couple.rankingGroupId = this.selectedGroup;
    couple.users = this.players.filter(p => this.selectedPlayers.includes(p.id));
    if (this.isNew) {
      this.couplesService.addCoupleToRanking(couple)
                        .subscribe(r => {
                          this.coupleAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
    else {
      this.couplesService.updateCoupleToRanking(couple)
                        .subscribe(r => {
                          this.coupleAction.emit(true);
                          this.myModal.close();
                        },
                        err => this.myModal.close());
    }
  }

  resetData(): void {
    this.action = undefined;
    this.title = undefined;
    this.coupleId = undefined;
    this.coupleName = undefined;
    this.selectedPlayers = []
  }


  addPlayerToCouple(): void {

  }
}
