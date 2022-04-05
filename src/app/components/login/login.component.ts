import { Component, OnInit } from '@angular/core';
import { VALID_EMAIL_DOMAINS, EMAIL_REGEX } from 'src/app/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  domains = VALID_EMAIL_DOMAINS;
  loginForm: FormGroup;
  constructor(
    private readonly _sharedService: SharedService,
    private readonly router: Router,
    private readonly _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    const getAllUserDetails = this._sharedService.getAllUserDetails();
    if (getAllUserDetails?.length) {
      this.validateUser(getAllUserDetails, this.loginForm.value);
    } else {
      this._sharedService.showPopup({
        value: true,
        title: 'ERROR',
        message: 'No User Found with the given details',
        confirmationButtons: false,
      });
    }
  }

  validateUser(allUsers, userDetails) {
    const validUser = (user) =>
      user.email === userDetails.email &&
      user.password === userDetails.password;

    if (allUsers.some(validUser)) {
      const loggedInUser = allUsers.filter(
        (user) =>
          user.email === userDetails.email &&
          user.password === userDetails.password
      );
      this._sharedService.currentUser(loggedInUser[0]);
      this.router.navigate(['/']);
    } else {
      this._sharedService.showPopup({
        value: true,
        title: 'ERROR',
        message: 'You have entered the Wrong credentials, Please try again !!',
        confirmationButtons: false,
      });
    }
  }
}
