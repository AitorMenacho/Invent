import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'invent';

  login: boolean = true;

  constructor(private router: Router) {
    // Comprobamos si estamos en login y si es así, no mostramos el sidenav
    router.events.subscribe((val) => {
      if (location.pathname == '/login') {
        this.login = false;
      } else {
        this.login = true;
      }
    });
  }
}
