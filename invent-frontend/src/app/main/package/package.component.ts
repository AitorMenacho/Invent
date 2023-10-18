import { Component } from '@angular/core';

interface typePackage {
  tipo: string;
  kg: string;
  formula: string;
}

const ELEMENT_DATA: typePackage[] = [
  {
    tipo: 'Paquete ultra ligero',
    kg: '0 < kg ≤ 0.1',
    formula: 'Precio = kg x 5',
  },
  {
    tipo: 'Paquete ligero',
    kg: '0.1 < kg ≤ 0.3',
    formula: 'Precio = kg x 5 + 1',
  },
  { tipo: 'Paquete estándar', kg: '0.3 < kg ≤ 5', formula: 'Precio = kg x 10' },
  {
    tipo: 'Paquete pesado',
    kg: '5 < kg ≤ 10',
    formula: 'Precio = kg x 5 + kg + 75',
  },
  {
    tipo: 'Gran volumen',
    kg: '10 < kg ≤ ∞',
    formula: 'Precio = (kg - 10) x 7,5 + 130 + kg',
  },
];

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent {
  displayedColumns: string[] = [
    'Tipo de paquete',
    'Intervalo de Kg',
    'Fórmula cálculo precio',
  ];
  dataSource = ELEMENT_DATA;
}
