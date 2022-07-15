// Libreria Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { DialogProductComponent } from './product/dialog/dialogproduct.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorComponent } from './error/error.component';
import { MyBusinnessComponent } from './mybusinness/mybusinness.component';
import { DistributorComponent } from './distributor/distributor.component';
import { ClientInactiveComponent } from './client/clientinactive/clientinactive.component';
import { DistributorInactiveComponent } from './distributor/distributorinactive/distributorinactive.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RecoveryComponent } from './login/recovery/recovery.component';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';
import { CategoryComponent } from './product/category/category.component';
import { InactiveProductComponent } from './product/inactiveproduct/inactiveproduct.component';
import { DialogCategoryComponent } from './product/category/dialogcategory/dialogcategory.component';
import { MeasureComponent } from './product/measure/measure.component';
import { DialogMeasureComponent } from './product/measure/dialogmeasure/dialogmeasure.component';
import { DialogRescueComponent } from './common/rescue/dialogrescue.component';
import { DialogClientComponent } from './client/dialog/dialogclient.component';
import { DialogDistributorComponent } from './distributor/dialogdistributor/dialogdistributor.component';
import { UserComponent } from './user/user.component';
import { DialogUserComponent } from './user/dialoguser/dialoguser.component';
import { RegisterBusinessComponent } from './login/registerbusiness/registerbusiness.component';
import { RegisteruserComponent } from './login/registeruser/registeruser.component';
import { InactiveuserComponent } from './user/inactiveuser/inactiveuser.component';
import { AddorderComponent } from './order/addorder/addorder.component';
import { OrdermdComponent } from './ordermd/ordermd.component';
import { DialogordermdComponent } from './ordermd/dialogordermd/dialogordermd.component';
import { DialogorderdetailComponent } from './ordermd/dialogorderdetail/dialogorderdetail.component';
import { DialogrecoveryComponent } from './login/recovery/dialogrecovery/dialogrecovery.component';
import { RequestComponent } from './request/request.component';
import { PasswordComponent } from './password/password.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { StringsOnlyDirective } from './directives/strings-only.directive';
import { AnswerComponent } from './answer/answer.component';
import { DialogorderComponent } from './order/dialogorder/dialogorder.component';
import { DialogshowComponent } from './ordermd/dialogshow/dialogshow.component';
import { DialogdeliveridComponent } from './ordermd/dialogdeliverid/dialogdeliverid.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DialogentryComponent } from './inventory/dialogentry/dialogentry.component';
import { EntryComponent } from './inventory/entry/entry.component';
import { DialogalertComponent } from './inventory/dialogalert/dialogalert.component';
import { BuyComponent } from './buy/buy.component';
import { DialogshowrequestComponent } from './request/dialogshowrequest/dialogshowrequest.component';
import { DialogshowbuyComponent } from './buy/dialogshowbuy/dialogshowbuy.component';
import { DialogbuyComponent } from './buy/dialogbuy/dialogbuy.component';
import { DialogproductorderComponent } from './inference/dialogproductorder/dialogproductorder.component';
import { DialogpriceComponent } from './inventory/dialogprice/dialogprice.component';
import { ReportComponent } from './report/report.component';
import { ReportbuyComponent } from './report/reportbuy/reportbuy.component';
import { ReportproductComponent } from './report/reportproduct/reportproduct.component';
import { ReportinventaryComponent } from './report/reportinventary/reportinventary.component';
import { BuyweekComponent } from './report/reportbuy/buyweek/buyweek.component';
import { BuymounthComponent } from './report/reportbuy/buymounth/buymounth.component';
import { DialoginactiveuserComponent } from './user/dialoginactiveuser/dialoginactiveuser.component';
import { DialoginactivedistributorComponent } from './distributor/dialoginactivedistributor/dialoginactivedistributor.component';
import { DialoginactiveproductComponent } from './product/dialoginactiveproduct/dialoginactiveproduct.component';
import { LotComponent } from './lot/lot.component';
import { InactivelotComponent } from './lot/inactivelot/inactivelot.component';
import { DialoginactivelotComponent } from './lot/dialoginactivelot/dialoginactivelot.component';
import { RetiredlotComponent } from './lot/retiredlot/retiredlot.component';
import { ReportmeasureComponent } from './report/reportmeasure/reportmeasure.component';
import { MeasuredayComponent } from './report/reportmeasure/measureday/measureday.component';
import { MeasureweekComponent } from './report/reportmeasure/measureweek/measureweek.component';
import { MeasuremountComponent } from './report/reportmeasure/measuremount/measuremount.component';
import { ReportcategoryComponent } from './report/reportcategory/reportcategory.component';
import { CategorydayComponent } from './report/reportcategory/categoryday/categoryday.component';
import { CategoryweekComponent } from './report/reportcategory/categoryweek/categoryweek.component';
import { CategorymonthComponent } from './report/reportcategory/categorymonth/categorymonth.component';
import { ProductdayComponent } from './report/reportproduct/productday/productday.component';
import { ProductweekComponent } from './report/reportproduct/productweek/productweek.component';
import { ProductmonthComponent } from './report/reportproduct/productmonth/productmonth.component';
import { ProductinventaryComponent } from './report/reportinventary/productinventary/productinventary.component';
import { MeasureinventaryComponent } from './report/reportinventary/measureinventary/measureinventary.component';
import { CategoryinventaryComponent } from './report/reportinventary/categoryinventary/categoryinventary.component';
import { RetreatComponent } from './inventory/retreat/retreat.component';
import { DialogretreatComponent } from './inventory/dialogretreat/dialogretreat.component';

//Invocaciones e Injecciones
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientComponent,
    LoginComponent,
    DialogDeleteComponent,
    DialogProductComponent,
    OrderComponent,
    ProductComponent,
    ErrorComponent,
    MyBusinnessComponent,
    DistributorComponent,
    ClientInactiveComponent,
    DistributorInactiveComponent,
    NavbarComponent,
    RecoveryComponent,
    CategoryComponent,
    InactiveProductComponent,
    DialogCategoryComponent,
    MeasureComponent,
    DialogMeasureComponent,
    DialogRescueComponent,
    DialogClientComponent,
    DialogDistributorComponent,
    UserComponent,
    DialogUserComponent,
    RegisterBusinessComponent,
    RegisteruserComponent,
    InactiveuserComponent,
    AddorderComponent,
    OrdermdComponent,
    DialogordermdComponent,
    DialogorderdetailComponent,
    RequestComponent,
    DialogrecoveryComponent,
    PasswordComponent,
    NumbersOnlyDirective,
    StringsOnlyDirective,
    AnswerComponent,
    DialogorderComponent,
    DialogshowComponent,
    DialogdeliveridComponent,
    InventoryComponent,
    DialogentryComponent,
    EntryComponent,
    DialogalertComponent,
    BuyComponent,
    DialogshowrequestComponent,
    DialogshowbuyComponent,
    DialogbuyComponent,
    DialogproductorderComponent,
    DialogpriceComponent,
    ReportComponent,
    ReportbuyComponent,
    ReportproductComponent,
    ReportinventaryComponent,
    BuyweekComponent,
    BuymounthComponent,
    DialoginactiveuserComponent,
    DialoginactivedistributorComponent,
    DialoginactiveproductComponent,
    LotComponent,
    InactivelotComponent,
    DialoginactivelotComponent,
    RetiredlotComponent,
    ReportmeasureComponent,
    MeasuredayComponent,
    MeasureweekComponent,
    MeasuremountComponent,
    ReportcategoryComponent,
    CategorydayComponent,
    CategoryweekComponent,
    CategorymonthComponent,
    ProductdayComponent,
    ProductweekComponent,
    ProductmonthComponent,
    ProductinventaryComponent,
    MeasureinventaryComponent,
    CategoryinventaryComponent,
    RetreatComponent,
    DialogretreatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SpinnerModule,
    NgxChartsModule,
    ToastrModule.forRoot()
  ],
  providers:
    [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
