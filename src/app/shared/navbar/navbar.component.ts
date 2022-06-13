import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { ApiAuthService } from 'src/app/services/apiauth.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: string = "MarketAlfa";
  user !: User;

  constructor(public api: ApiAuthService, private router: Router)
  {
    this.api.user.subscribe(x => { this.user = x; });
  }

  ngOnInit(): void {
  }

  logout()
  {
    this.api.logout();
    this.router.navigate(['/login']);
  }

}
