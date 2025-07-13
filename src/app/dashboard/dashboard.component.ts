import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { claimReq } from '../shared/utils/claimReq-utils';
import { HideIfClaimsNotMetDirective } from '../shared/directives/hide-if-claims-not-met.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HideIfClaimsNotMetDirective,CommonModule],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService){}

  fullName:string='';

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res:any) =>{
        this.fullName = res.userName
      },
      error:err=>{
        console.log(err)
      }
    })
  }
  claimReq = claimReq

}
