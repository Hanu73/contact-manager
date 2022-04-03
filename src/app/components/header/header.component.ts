import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string;
  hideLogoutNavs = ['/login', '/signup'];
  constructor(
    private readonly _sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNavigation();
  }

  getNavigation() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.currentRoute = event.url;
    });
  }

  logOut() {
    this._sharedService.userLogout();
    this.router.navigate(['/login']);
  }
}
