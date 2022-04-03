import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';
import { SUCCESS_ALERT_CLASS, VALID_EMAIL_DOMAINS } from '../../constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  emailRegex: string;
  domains = VALID_EMAIL_DOMAINS;

  constructor(
    private readonly _sharedService: SharedService,
    private readonly _storageService: StorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // this._storageService.setLocalStorage('userID', JSON.stringify([]));
    // this._storageService.setLocalStorage('userDetails', JSON.stringify([]));
    console.log(this._sharedService.getUniqueIDs());


    this.emailRegex =
      '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(inmar).*$';
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  signup() {
    const uniqueID = this._sharedService.uniqueRandomID(10);
    const userData = { ...this.signUpForm.value, uniqueID };
    this.signUpForm.reset();

    this._sharedService.addNewUser(userData);
    this._sharedService.addNewUserID(uniqueID);

    let alertsData = {
      message: 'Successfully Signed Up',
      color: SUCCESS_ALERT_CLASS,
    };

    this._sharedService.showAlerts(alertsData);

    this.router.navigate(['/']);
  }
}
