import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-couple-management',
  templateUrl: './couple-management.component.html'
})
export class CoupleManagementComponent implements OnInit {

  @Input()
  rankingId: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCouplesByRanking(this.rankingId);
  }

}
