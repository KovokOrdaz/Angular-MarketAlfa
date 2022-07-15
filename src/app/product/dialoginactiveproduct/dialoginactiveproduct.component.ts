import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, User } from 'src/app/models';
import { InactiveElement } from 'src/app/models/inactiveElement';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({
  selector: 'app-dialoginactiveproduct',
  templateUrl: './dialoginactiveproduct.component.html',
  styleUrls: ['./dialoginactiveproduct.component.scss']
})
export class DialoginactiveproductComponent implements OnInit {
  userX !: User;
  reason: string;
  name: string;
  id: string;
  constructor(public dialogRef: MatDialogRef<DialoginactiveproductComponent>, public apiAuth: ApiAuthService, private api: ApiProductService, private Toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public entity: Product) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.userX = x } else { this.router.navigate(['/']); } });
    this.name = entity.name;
    this.id = entity.code;
  }
  ngOnInit(): void {
  }

  close() { this.dialogRef.close() }

  change() {
    if (this.reason.length > 9) {
      const entity: InactiveElement = { id: this.id, reason: this.reason, user: this.userX.id.toString() };
      console.log(entity);
      this.api.delete(entity).subscribe(result => {
        if (result.success === 1) {
          this.dialogRef.close();
          this.Toastr.warning("Producto Desactivado", "MarketAlfa");
          this.router.navigate(['/product']);
        }
        else {
          this.Toastr.error("Ha ocurrido un error", "MarketAlfa");
          console.log(result.message);
        }
      });
    }
    else {
      this.Toastr.warning("La Razón o Motivo debe ser mayor 10 caracteres", "MarketAlfa");
    }

  }
}
