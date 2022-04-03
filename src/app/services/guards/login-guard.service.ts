import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(
    public router: Router,
    private readonly _sharedService: SharedService
  ) {}

  canActivate(): boolean {
    if (this._sharedService.isUserLoggedIn()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
