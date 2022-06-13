import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientInactiveComponent } from './client/clientinactive/clientinactive.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeInactiveComponent } from './employee/employeeinactive/employeeinactive.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './security/auth.guard';
import { ContactEmergencyComponent } from './employee/contactemergency/contactemergency.component';
import { MyBusinnessComponent } from './mybusinness/mybusinness.component';
import { DistributorComponent } from './distributor/distributor.component';
import { DistributorInactiveComponent } from './distributor/distributorinactive/distributorinactive.component';
//{path: '', redirectTo: '/home', pathMatch: 'full'}
const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'client/inactive', component: ClientInactiveComponent, canActivate: [AuthGuard]},
  {path: 'distributor', component: DistributorComponent, canActivate: [AuthGuard]},
  {path: 'distributor/inactive', component: DistributorInactiveComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ProductComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'employee/inactive', component: EmployeeInactiveComponent},
  {path: 'employee/contactemergency', component: ContactEmergencyComponent},
  {path: 'employee/academic', component: ContactEmergencyComponent},
  {path: 'mybusiness', component: MyBusinnessComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
