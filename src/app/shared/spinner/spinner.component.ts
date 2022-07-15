import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="overlay" *ngIf="this.isLoading$ | async"><mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner></div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$ = this.service.isLoading$;
  constructor(private service: SpinnerService) 
  {

  }

}