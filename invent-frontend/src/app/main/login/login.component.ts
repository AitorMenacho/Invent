import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  textError: string = '';
  hide: boolean = true;
  disabledPasswordVisibility: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    if (!this.disabledPasswordVisibility) {
      this.hide = !this.hide;
      this.disabledPasswordVisibility = true;

      // Habilitar el botón después de 500 ms (puedes ajustar el tiempo según tus necesidades)
      setTimeout(() => {
        this.disabledPasswordVisibility = false;
      }, 500);
    }
  }

  async login(event: Event) {
    event.preventDefault();

    if (this.email.length > 0 && this.password.length > 0) {
      const user: User = {
        email: this.email,
        password: this.password,
      };

      this.authService.login(user).subscribe((response: any) => {
        if (response.token !== undefined) {
          // Guardar el token y el usuario en el localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.name);
        }
        // Redireccionar al componente 'package' si el usuario y la contraseña son correctos
        if (localStorage.getItem('token')) {
          this.router.navigate(['/package']);
        } else {
          this.textError = 'Usuario o contraseña incorrectos';
        }
      });
    } else {
      this.textError = 'Debe rellenar todos los campos';
    }
    this.textError = 'Debe rellenar todos los campos';
  }
}
