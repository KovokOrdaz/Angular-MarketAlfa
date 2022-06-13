// Libreria Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { OrderComponent } from './order/order.component';
import { DialogOrderComponent } from './order/dialog/dialogorder.Component';
import { ProductComponent } from './product/product.component';
import { DialogProductComponent } from './product/dialog/dialogproduct.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmployeeComponent } from './employee/employee.component';
import { ErrorComponent } from './error/error.component';
import { ContactEmergencyComponent } from './employee/contactemergency/contactemergency.component';
import { AcademicComponent } from './employee/academic/academic.component';
import { EmployeeInactiveComponent } from './employee/employeeinactive/employeeinactive.component';
import { MyBusinnessComponent } from './mybusinness/mybusinness.component';
import { DistributorComponent } from './distributor/distributor.component';
import { ClientInactiveComponent } from './client/clientinactive/clientinactive.component';
import { DistributorInactiveComponent } from './distributor/distributorinactive/distributorinactive.component';
import { DialogAcademicComponent } from './employee/academic/dialog/dialogacademic.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RecoveryComponent } from './login/recovery/recovery.component';
import { RegisterComponent } from './login/register/register.component';
import { SpinnerMComponent } from './shared/spinner/spinner.component';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';
//Invocaciones e Injecciones
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientComponent,
    LoginComponent,
    DialogDeleteComponent,
    DialogOrderComponent,
    DialogProductComponent,
    DialogAcademicComponent,
    OrderComponent,
    ProductComponent,
    EmployeeComponent,
    ErrorComponent,
    ContactEmergencyComponent,
    AcademicComponent,
    EmployeeInactiveComponent,
    MyBusinnessComponent,
    DistributorComponent,
    ClientInactiveComponent,
    DistributorInactiveComponent,
    NavbarComponent,
    RecoveryComponent,
    RegisterComponent,
    SpinnerMComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: 
  [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
