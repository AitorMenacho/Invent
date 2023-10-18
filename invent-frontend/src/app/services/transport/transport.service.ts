import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  constructor() {}

  private baseUrl = 'http://localhost:3000';
  private token = localStorage.getItem('token') || '';

  // Traemos todos los transportes
  async getTransports() {
    try {
      const response = await fetch(`${this.baseUrl}/transports`, {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
          Authorization: this.token,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Borramos un transporte
  async deleteTransport(id: number) {
    try {
      const response = await fetch(`${this.baseUrl}/transports/${id}`, {
        method: 'DELETE',
        headers: {
          'content-Type': 'application/json',
          Authorization: this.token,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Creamos un transporte
  async createTransport(transport: any) {
    try {
      const response = await fetch(`${this.baseUrl}/transports`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
          Authorization: this.token,
        },
        body: JSON.stringify(transport),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Actualizamos un transporte
  async updateTransport(transport: any) {
    try {
      const response = await fetch(
        `${this.baseUrl}/transports/${transport.id}`,
        {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
            Authorization: this.token,
          },
          body: JSON.stringify(transport),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
