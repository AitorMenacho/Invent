import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private baseUrl = 'http://localhost:3000/shipments';
  private token = localStorage.getItem('token') || '';

  constructor() {}

  // Trae todos los envios
  getShipping() {
    return fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  // Crea un envio
  async createShipping(shipping: any) {
    try {
      return await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
          Authorization: this.token,
        },
        body: JSON.stringify(shipping),
      });
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  }

  // Elimina un envio
  deleteShipping(id: number) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        Authorization: this.token,
      },
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
