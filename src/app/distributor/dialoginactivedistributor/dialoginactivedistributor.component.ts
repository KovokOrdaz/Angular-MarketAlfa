import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { Distributor } from 'src/app/models/distributor';
import { InactiveElement } from 'src/app/models/inactiveElement';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiDistributorService } from 'src/app/services/apidistributor.service';

@Component({
  selector: 'app-dialoginactivedistributor',
  templateUrl: './dialoginactivedistributor.component.html'
})
export class DialoginactivedistributorComponent implements OnInit {
  userX !: User;
  reason: string;
  name: string;
  id: string;
  constructor(public dialogRef: MatDialogRef<DialoginactivedistributorComponent>, public apiAuth: ApiAuthService, private api: ApiDistributorService, private Toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public entity: Distributor) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.userX = x } else { this.router.navigate(['/']); } });
    this.name = entity.name;
    this.id = entity.rif;
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
          this.Toastr.warning("Proveedor Desactivado", "MarketAlfa");
          this.router.navigate(['/distributor']);
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
