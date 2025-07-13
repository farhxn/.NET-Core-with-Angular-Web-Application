import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
  <!-- <app-header/> -->
    <main>
      <router-outlet />
    </main>
  `,
  // templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'PaymentApp';
}
