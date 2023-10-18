import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { Observable, from } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}

  public login(user: User): Observable<any> {
    return from(this.userService.login(user));
  }

  public getUser(): string | null {
    return localStorage.getItem('user');
  }
}
