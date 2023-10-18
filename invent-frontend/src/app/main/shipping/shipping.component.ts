import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewShippingComponent } from './components/modal-new-shipping/modal-new-shipping.component';
import { ModalAcceptedComponent } from 'src/app/share/modal/modal-accepted/modal-accepted.component';
import { ShippingService } from '../../services/shipping/shipping.service';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
}

export interface shipping {
  id: number;
  destiny: string;
  zip: string;
  destinationName: string;
  senderName: string;
  weight: number;
  transport: string;
  price: number;
}

const ELEMENT_DATA: shipping[] = [];

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class ShippingComponent {
  displayedColumns: string[] = [
    'num',
    'destiny',
    'zip',
    'destinationName',
    'senderName',
    'weight',
    'transport',
    'price',
    'actions',
  ];

  dataSource = new MatTableDataSource<shipping>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialog: MatDialog,
    private shippingService: ShippingService
  ) {
    this.getShipping();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  //Nos traemos los envios
  getShipping() {
    this.shippingService.getShipping().then((response: unknown) => {
      if (response instanceof Response) {
        if (response.ok) {
          response.json().then((data) => {
            this.dataSource = new MatTableDataSource<shipping>(data);
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
          });
        }
      }
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalNewShippingComponent, {
      data: {
        title: 'Crear envío',
        inputs: [
          {
            type: 'text',
            name: 'address',
            placeholder: 'Dirección de destino',
            label: 'Dirección de destino',
            value: '',
          },
          {
            type: 'text',
            name: 'zip',
            placeholder: 'Código postal',
            label: 'Código postal',
            value: '',
          },
          {
            type: 'text',
            name: 'destination name',
            placeholder: 'Nombre del destinatario',
            label: 'Nombre del destinatario',
            value: '',
          },
          {
            type: 'text',
            name: 'sender name',
            placeholder: 'Nombre del remitente',
            label: 'Nombre del remitente',
            value: '',
          },
          {
            type: 'number',
            name: 'weight',
            placeholder: 'Peso en kg',
            label: 'Peso en kg',
            value: '',
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // TODO: Hacer la petición al servidor
      // Recogemos los datos del formulario y los añadimos a la tabla
      let address = '';
      let zip = '';
      let destinationName = '';
      let senderName = '';
      let weight = 0;

      result.inputs.map((input: any) => {
        if (input.name === 'address') {
          address = input.value;
        } else if (input.name === 'zip') {
          zip = input.value;
        } else if (input.name === 'destination name') {
          destinationName = input.value;
        } else if (input.name === 'sender name') {
          senderName = input.value;
        } else if (input.name === 'weight') {
          weight = input.value;
        }
      });

      const shipping: shipping = {
        id: 0,
        destiny: address,
        zip: zip,
        destinationName: destinationName,
        senderName: senderName,
        weight: weight,
        transport: result.company,
        price: result.price,
      };

      this.shippingService
        .createShipping(shipping)
        .then((response: unknown) => {
          if (response instanceof Response) {
            if (response.ok) {
              // Mostramos el modal de éxito
              const dialogRefAccepted = this.dialog.open(
                ModalAcceptedComponent,
                {
                  data: {
                    title: 'Envío creado',
                    message: 'El envío se ha creado correctamente',
                    icon: 'check_circle',
                  },
                }
              );

              dialogRefAccepted.afterClosed().subscribe(() => {
                this.getShipping();
              });
            } else {
              // Mostramos el modal de error
              const dialogRefAccepted = this.dialog.open(
                ModalAcceptedComponent,
                {
                  data: {
                    title: 'Error al crear el envío',
                    message: 'El envío no se ha podido crear correctamente',
                    icon: 'error',
                  },
                }
              );
            }
          }
        });

      this.dataSource = new MatTableDataSource<shipping>(ELEMENT_DATA);

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(shipping: shipping) {
    this.shippingService
      .deleteShipping(shipping.id)
      .then((response: unknown) => {
        if (response instanceof Response) {
          if (response.ok) {
            // Mostramos el modal de éxito
            const dialogRefAccepted = this.dialog.open(ModalAcceptedComponent, {
              data: {
                title: 'Envío eliminado',
                message: 'El envío se ha eliminado correctamente',
                icon: 'check_circle',
              },
            });

            dialogRefAccepted.afterClosed().subscribe(() => {
              this.getShipping();
            });
          } else {
            // Mostramos el modal de error
            const dialogRefAccepted = this.dialog.open(ModalAcceptedComponent, {
              data: {
                title: 'Error al eliminar el envío',
                message: 'El envío no se ha podido eliminar correctamente',
                icon: 'error',
              },
            });
          }
        }
      });
  }
}
