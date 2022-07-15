import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnswerComponent } from 'src/app/answer/answer.component';
import { DialogproductorderComponent } from 'src/app/inference/dialogproductorder/dialogproductorder.component';
import { User } from 'src/app/models';
import { OrderX } from 'src/app/models/orderX';
import { MyBusinnessComponent } from 'src/app/mybusinness/mybusinness.component';
import { DialogdeliveridComponent } from 'src/app/ordermd/dialogdeliverid/dialogdeliverid.component';
import { PasswordComponent } from 'src/app/password/password.component';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiDistributorService } from 'src/app/services/apidistributor.service';
import { ApiinventoryService } from 'src/app/services/apiinventory.service';
import { ApilotService } from 'src/app/services/apilot.service';
import { ApiOrderService } from 'src/app/services/apiorder.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: string = "MarketAlfa";
  user !: User;
  ListOrder: any[] = [];
  ListProduct: any[] = [];
  ListExpired: any[] = [];
  ListLow: any[] = [];

  constructor(public api: ApiAuthService, public apiLot: ApilotService, private router: Router, public Toastr: ToastrService, public dialog: MatDialog, private apiOrder: ApiOrderService, public apiInv: ApiinventoryService, public apiDist: ApiDistributorService) {
    this.api.user.subscribe(x => { this.user = x; });
    console.log(this.user);
    this.apiOrder.readInference().subscribe(x => { this.ListOrder = x.data; console.log(this.ListOrder) });
    this.apiInv.low().subscribe(x => { this.ListProduct = x.data; console.log(this.ListProduct) });
    this.apiLot.readLow().subscribe(x => { this.ListLow = x.data; console.log(this.ListLow) });
  }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.apiOrder.readInference().subscribe(x => { this.ListOrder = x.data; console.log(this.ListOrder) });
    this.apiInv.low().subscribe(x => { this.ListProduct = x.data; console.log(this.ListOrder) });
    this.apiLot.readEmpty().subscribe(x => {
      this.ListExpired = x.data;
      console.log(this.ListExpired);
      for (var i = 0; i < this.ListExpired.length; i++) {
        const Expired = this.ListExpired[i];
        console.log(Expired);
        this.apiLot.deleteX(Expired).subscribe(result => {
          if (result.success === 1) {
            console.log(Expired);
            this.Toastr.warning("El Producto " + Expired.name + " del Lote # " + Expired.lot + " Caduco El " + Expired.expiration + " y fue Removido del Inventario", "MarketAlfaApp");
          }
          else {
            this.Toastr.warning("Registro Fallido", "MarketAlfaApp");
          }
        });
      }
    });
  }

  openBook(): void {
    window.open('http://www.mediafire.com/file/q6ffe938n2pjp8x', '_blank');
  }

  openDeliverid(entity: OrderX) {
    const dialogRef = this.dialog.open(DialogdeliveridComponent, {
      data: entity, maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
  }

  openOrder(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogproductorderComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
    dialogRef.componentInstance.nameProduct = name;
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(finish => { this.read() });
  }

  orderInference() {

  }

  myBusinessSeting() {
    this.dialog.open(MyBusinnessComponent);
  }

  change() {
    this.dialog.open(PasswordComponent, { data: this.user.id });
  }

  changeAnswer() {
    this.dialog.open(AnswerComponent, { data: this.user.id });
  }

  logout() {
    this.api.logout();
    this.router.navigate(['/']);
  }

}
