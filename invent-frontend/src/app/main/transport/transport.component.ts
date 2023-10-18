import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewTransportComponent } from './component/modal-new-transport/modal-new-transport.component';
import { TransportService } from 'src/app/services/transport/transport.service';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
}

export interface transport {
  id: number;
  companny: string;
  zip: string;
}

const ELEMENT_DATA: transport[] = [];

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class TransportComponent {
  displayedColumns: string[] = ['num', 'company', 'zip', 'actions'];
  dataSource = new MatTableDataSource<transport>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialog: MatDialog,
    private transportService: TransportService
  ) {
    this.getTransports();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalNewTransportComponent, {
      data: {
        title: 'Nueva compañía de transporte',
        inputs: [
          {
            type: 'text',
            name: 'company',
            placeholder: 'Compañía',
            label: 'Compañía',
            value: '',
          },
          {
            type: 'text',
            name: 'zip',
            placeholder: 'Código postal',
            label: 'Código postal separado por comas',
            value: '',
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Recogemos los datos del formulario y los añadimos a la tabla
      let company = '';
      let zip = '';

      result.inputs.map((input: any) => {
        if (input.name === 'company') {
          company = input.value;
        } else if (input.name === 'zip') {
          zip = input.value;
        }
      });

      const transport: transport = {
        id: 0,
        companny: company,
        zip: zip,
      };

      this.transportService.createTransport(transport).then((data) => {
        this.getTransports();
      });
    });
  }

  getTransports() {
    this.transportService.getTransports().then((data) => {
      this.dataSource.data = data;
    });
  }

  delete(transport: transport) {
    this.transportService.deleteTransport(transport.id).then((data) => {
      this.getTransports();
    });
  }

  edit(transport: transport) {
    const dialogRef = this.dialog.open(ModalNewTransportComponent, {
      data: {
        title: 'Editar compañía de transporte',
        inputs: [
          {
            type: 'text',
            name: 'company',
            placeholder: 'Compañía',
            label: 'Compañía',
            value: transport.companny,
          },
          {
            type: 'text',
            name: 'zip',
            placeholder: 'Código postal',
            label: 'Código postal separado por comas',
            value: transport.zip,
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      let company = '';
      let zip = '';

      result.inputs.map((input: any) => {
        if (input.name === 'company') {
          company = input.value;
        } else if (input.name === 'zip') {
          zip = input.value;
        }
      });

      const transportEdit: transport = {
        id: transport.id,
        companny: company,
        zip: zip,
      };

      this.transportService.updateTransport(transportEdit).then((data) => {
        this.getTransports();
      });

    });
  }
}
