import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { InactiveElement } from 'src/app/models/inactiveElement';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApilotService } from 'src/app/services/apilot.service';

@Component({
  selector: 'app-dialoginactivelot',
  templateUrl: './dialoginactivelot.component.html',
  styleUrls: ['./dialoginactivelot.component.scss']
})
export class DialoginactivelotComponent implements OnInit {
  userX !: User;
  reason: string;
  name: string;
  id: number;
  lot: string;

  constructor(public dialogRef: MatDialogRef<DialoginactivelotComponent>, public apiAuth: ApiAuthService, private api: ApilotService, private Toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public entity: any) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.userX = x } else { this.router.navigate(['/']); } });
    this.name = entity.name;
    this.id = entity.id;
    this.lot = entity.lot;
  }

  ngOnInit(): void {
  }

  close() { this.dialogRef.close() }

  change() {
    if (this.reason.length > 9) {
      const entity: InactiveElement = { id: this.id.toString(), reason: this.reason, user: this.userX.id.toString() };
      console.log(entity);
      this.api.delete(entity).subscribe(result => {
        if (result.success === 1) {
          this.dialogRef.close();
          this.Toastr.warning("Lote Retirado", "MarketAlfa");
          this.router.navigate(['/inventary/lot']);
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
