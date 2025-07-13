import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimReq } from '../../shared/utils/claimReq-utils';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,RouterModule,HideIfClaimsNotMetDirective],
  templateUrl: './main-layout.component.html',
  styles: ``
})
export class MainLayoutComponent {

    constructor(private route:Router, private authService:AuthService){}

    claimReq = claimReq

    onLogout() {
    this.authService.deleteToken()
    this.route.navigateByUrl('/login');
  }
}
