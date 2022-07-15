import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { InactiveElement } from 'src/app/models/inactiveElement';
import { Users } from 'src/app/models/users';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiUserService } from 'src/app/services/apiuser.service';

@Component({
  selector: 'app-dialoginactiveuser',
  templateUrl: './dialoginactiveuser.component.html',
  styleUrls: ['./dialoginactiveuser.component.scss']
})
export class DialoginactiveuserComponent implements OnInit {
  userX !: User;
  reason: string;
  name: string;
  id: number;
  constructor(public dialogRef: MatDialogRef<DialoginactiveuserComponent>, public apiAuth: ApiAuthService, private api: ApiUserService, private Toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public user: Users) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.userX = x } else { this.router.navigate(['/']); } });
    this.name = user.pseudomyn;
    this.id = user.id;
  }

  ngOnInit(): void {
  }

  close() { this.dialogRef.close() }

  change() {
    if (this.reason.length > 9) {
      const entity: InactiveElement = { id: this.id.toString(), reason: this.reason, user: this.userX.username };
      this.api.delete(entity).subscribe(result => {
        if (result.success === 1) {
          this.dialogRef.close();
          this.Toastr.warning("Usuario Desactivado", "MarketAlfa");
          this.router.navigate(['/user']);
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
