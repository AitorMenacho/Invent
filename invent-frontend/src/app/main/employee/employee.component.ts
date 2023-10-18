import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user/user.service';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
}

export interface employee {
  name: string;
  surname: string;
  email: string;
  rol: string;
}

const ELEMENT_DATA: employee[] = [];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class EmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'rol'];
  dataSource = new MatTableDataSource<employee>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private userService: UserService) {
    this.getEmployees().then((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // Sacamos todos los trabajadores
  async getEmployees() {
    const response = await this.userService.getEmployees();

    const data = response.map((employee: any) => {
      return {
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        rol: employee.rol,
      };
    });

    return data;
  }
}
