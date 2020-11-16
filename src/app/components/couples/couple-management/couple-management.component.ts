import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CouplesService } from '../../../services/couples.service';

@Component({
  selector: 'app-couple-management',
  templateUrl: './couple-management.component.html'
})
export class CoupleManagementComponent implements OnInit {

  @Input()
  rankingId: number;

  constructor(private coupleService: CouplesService) { }

  ngOnInit(): void {
    this.coupleService.getCouplesByRanking(this.rankingId);
  }

}
