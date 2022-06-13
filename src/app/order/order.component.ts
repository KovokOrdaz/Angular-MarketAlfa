import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogOrderComponent } from './dialog/dialogorder.Component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  readonly width: string = "600px" 
  constructor( public dialog: MatDialog, public snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  openCreate() 
  {
    const dialogRef = this.dialog.open(DialogOrderComponent, {width: this.width});
  }
}
