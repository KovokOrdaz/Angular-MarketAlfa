import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientInactiveComponent } from './client/clientinactive/clientinactive.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './security/auth.guard';
import { MyBusinnessComponent } from './mybusinness/mybusinness.component';
import { DistributorComponent } from './distributor/distributor.component';
import { DistributorInactiveComponent } from './distributor/distributorinactive/distributorinactive.component';
import { CategoryComponent } from './product/category/category.component';
import { MeasureComponent } from './product/measure/measure.component';
import { InactiveProductComponent } from './product/inactiveproduct/inactiveproduct.component';
import { UserComponent } from './user/user.component';
import { RegisterBusinessComponent } from './login/registerbusiness/registerbusiness.component';
import { RegisteruserComponent } from './login/registeruser/registeruser.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EntryComponent } from './inventory/entry/entry.component';
import { BuyComponent } from './buy/buy.component';
import { RequestComponent } from './request/request.component';
import { InactiveuserComponent } from './user/inactiveuser/inactiveuser.component';
import { ReportComponent } from './report/report.component';
import { LotComponent } from './lot/lot.component';
import { InactivelotComponent } from './lot/inactivelot/inactivelot.component';
import { RetiredlotComponent } from './lot/retiredlot/retiredlot.component';
import { RetreatComponent } from './inventory/retreat/retreat.component';
//{path: '', redirectTo: '/home', pathMatch: 'full'}
const routes: Routes = [
  { path: '', component: LoginComponent },
  // {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'buy', component: BuyComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'client/inactive', component: ClientInactiveComponent, canActivate: [AuthGuard] },
  { path: 'distributor', component: DistributorComponent, canActivate: [AuthGuard] },
  { path: 'distributor/inactive', component: DistributorInactiveComponent, canActivate: [AuthGuard] },
  { path: 'inventary', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'inventary/entry', component: EntryComponent, canActivate: [AuthGuard] },
  { path: 'inventary/retreat', component: RetreatComponent, canActivate: [AuthGuard] },
  { path: 'inventary/lot', component: LotComponent, canActivate: [AuthGuard] },
  { path: 'inventary/lot/inactive', component: InactivelotComponent, canActivate: [AuthGuard] },
  { path: 'inventary/lot/retired', component: RetiredlotComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product/inactive', component: InactiveProductComponent, canActivate: [AuthGuard] },
  { path: 'product/category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'product/measure', component: MeasureComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'mybusiness', component: MyBusinnessComponent, canActivate: [AuthGuard] },
  { path: 'registermybusiness', component: RegisterBusinessComponent },
  { path: 'registeruser', component: RegisteruserComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/inactive', component: InactiveuserComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
