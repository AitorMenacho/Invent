import { Component } from '@angular/core';

interface Option {
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  greetings: string = '';
  options: Option[] = [];
  user: string | null = localStorage.getItem('user');

  constructor() {
    // obtenemos el nombre del usuario del localstorage
    let user = localStorage.getItem('user');

    //Comprobamos la hora actual para mostrar un saludo u otro
    let date = new Date();
    let hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      this.greetings = 'Buenos días';
    } else if (hour >= 12 && hour < 20) {
      this.greetings = 'Buenas tardes';
    } else {
      this.greetings = 'Buenas noches';
    }

    // Rellenamos el array de opciones
    this.options = [
      {
        name: 'paquetes',
        route: '/package',
        icon: 'inventory_2',
      },
      {
        name: 'Trabajadores',
        route: '/employee',
        icon: 'people',
      },
      {
        name: 'Envíos',
        route: '/shipping',
        icon: 'directions_run',
      },
      {
        name: 'Transportes',
        route: '/transport',
        icon: 'local_shipping',
      },
    ];
  }

  // Función para cerrar sesión
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
