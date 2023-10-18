import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private token = localStorage.getItem('token') || '';

  constructor() {}

  // Inicia sesion
  async login(user: any) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Trabajadores
  async getEmployees() {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: this.token,
      },
    });

    const data = await response.json();

    return data;
  }
}
