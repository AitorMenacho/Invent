import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface input {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-modal-new-transport',
  templateUrl: './modal-new-transport.component.html',
  styleUrls: ['./modal-new-transport.component.scss'],
})
export class ModalNewTransportComponent {
  title: string = '';
  inputs: input[] = [];

  price: number = 0;
  company: string = 'Pendiente de introducir código postal';

  constructor(
    public dialogRef: MatDialogRef<ModalNewTransportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.inputs = data.inputs;
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
      if (
        zip.startsWith('15') ||
        zip.startsWith('16') ||
        zip.startsWith('17') ||
        zip.startsWith('18') ||
        zip.startsWith('19')
      ) {
        this.company = 'Correos';
      } else if (
        zip.startsWith('20') ||
        zip.startsWith('21') ||
        zip.startsWith('22') ||
        zip.startsWith('23') ||
        zip.startsWith('24') ||
        zip.startsWith('25')
      ) {
        this.company = 'Seur';
      } else {
        this.company = 'Invent';
      }
    } else {
      this.company = 'Introduce un código postal';
    }
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
