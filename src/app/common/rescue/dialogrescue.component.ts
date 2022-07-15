import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialogrescue',
  templateUrl: './dialogrescue.component.html',
  styleUrls: ['./dialogrescue.component.scss']
})
export class DialogRescueComponent {

  constructor( public dialogRef: MatDialogRef<DialogRescueComponent>) { }

}
