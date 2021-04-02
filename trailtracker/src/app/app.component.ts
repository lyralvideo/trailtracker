import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trail Tracker';
  constructor(private auth:AuthService) {}

  logout() {
    this.auth.clearStorage();
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  loggedOut() {
    return this.auth.loggedOut();
  }

}
