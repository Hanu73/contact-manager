import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SharedService } from '../shared.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public router: Router,
    private readonly _sharedService: SharedService
  ) {}

  canActivate(): boolean {
    if (this._sharedService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
