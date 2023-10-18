import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { PackageComponent } from './main/package/package.component';
import { EmployeeComponent } from './main/employee/employee.component';
import { ShippingComponent } from './main/shipping/shipping.component';
import { TransportComponent } from './main/transport/transport.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'package',
    component: PackageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shipping',
    component: ShippingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
