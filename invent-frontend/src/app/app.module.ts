import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { PackageComponent } from './main/package/package.component';
import { EmployeeComponent } from './main/employee/employee.component';
import { ShippingComponent } from './main/shipping/shipping.component';
import { TransportComponent } from './main/transport/transport.component';
import { SidenavComponent } from './share/sidenav/sidenav.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalNewShippingComponent } from './main/shipping/components/modal-new-shipping/modal-new-shipping.component';
import { ModalNewTransportComponent } from './main/transport/component/modal-new-transport/modal-new-transport.component';
import { ModalAcceptedComponent } from './share/modal/modal-accepted/modal-accepted.component';
import { ModalRejectedComponent } from './share/modal/modal-rejected/modal-rejected.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PackageComponent,
    EmployeeComponent,
    ShippingComponent,
    TransportComponent,
    SidenavComponent,
    ModalNewShippingComponent,
    ModalNewTransportComponent,
    ModalAcceptedComponent,
    ModalRejectedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
