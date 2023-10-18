import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransportService } from '../../../../services/transport/transport.service';

interface input {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-modal-new-shipping',
  templateUrl: './modal-new-shipping.component.html',
  styleUrls: ['./modal-new-shipping.component.scss'],
})
export class ModalNewShippingComponent {
  title: string = '';
  inputs: input[] = [];
  transports: any[] = [];

  price: number = 0;
  company: string = 'Pendiente de introducir código postal';

  constructor(
    public dialogRef: MatDialogRef<ModalNewShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transportService: TransportService
  ) {
    this.title = data.title;
    this.inputs = data.inputs;
    this.getTransports();
  }

  // Calculamos el precio total y la empresa de transporte
  handleInputChange() {
    this.calculateTotalPrice();
    this.addressToCompanny();
  }

  // Calculamos el precio total
  calculateTotalPrice() {
    let total = 0;
    this.inputs.forEach((input) => {
      if (input.type === 'number') {
        let kg = parseFloat(input.value);

        if (0 < kg && kg <= 0.1) {
          total = kg * 5;
        } else if (0.1 < kg && kg <= 0.3) {
          total = kg * 5 + 1;
        } else if (0.3 < kg && kg <= 5) {
          total = kg * 10;
        } else if (5 < kg && kg <= 10) {
          total = kg * 5 + kg + 75;
        } else if (kg > 10) {
          total = (kg - 10) * 7.5 + 130 + kg;
        }
      }
    });

    this.price = total;
  }

  // Sacamos la empresa de transporte por CP
  addressToCompanny() {
    const zip = this.inputs.find((input) => input.name === 'zip')?.value;

    if (zip) {
      // Busca una empresa que coincida con el código postal
      const transport = this.transports.find((transport) => {
        const zipCodes = transport.zip.split(','); // Divide los códigos postales en un arreglo
        // Comprueba si alguno de los códigos postales coincide con el código postal del usuario
        return zipCodes.some((zipCode: string) => zip.startsWith(zipCode.trim()));
      });

      // Si encuentra una empresa, la asigna, si no, asigna Invent
      if (transport) {
        this.company = transport.companny;
      } else {
        this.company = 'Invent';
      }
    } else {
      this.company = 'Introduce un código postal';
    }
  }

  // Traemos los transportes
  getTransports() {
    this.transportService.getTransports().then((data) => {
      this.transports = data;
    });
  }

  exit() {
    this.dialogRef.close();
  }

  // Devuelve los valores de los inputs
  close() {
    this.dialogRef.close({
      inputs: this.inputs,
      price: this.price,
      company: this.company,
    });
  }
}
