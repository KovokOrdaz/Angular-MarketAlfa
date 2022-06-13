import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user !: User;
  title = 'MarketAlfa';
  
  constructor(){}
  
}
