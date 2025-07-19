import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styles: `
  `,
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-in-out', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class UserComponent implements OnInit {
  constructor(
    private context: ChildrenOutletContexts,
    private service: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      this.route.navigateByUrl('/dashboard');
    }
  }
  
  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
