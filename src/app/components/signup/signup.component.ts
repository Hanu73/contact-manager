import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';
import {
  SUCCESS_ALERT_CLASS,
  VALID_AADHAAR_ID_LENGTH,
  VALID_EMAIL_DOMAINS,
} from '../../constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  emailRegex: string;
  domains = VALID_EMAIL_DOMAINS;
  showAadhaarError = false;

  constructor(
    private readonly _sharedService: SharedService,
    private readonly _storageService: StorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.emailRegex =
      '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(gmail).*$';
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      aadhaar: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  checkAadhaarValidation(val) {
    this.showAadhaarError = val.toString().length !== VALID_AADHAAR_ID_LENGTH;
  }

  signup() {
    const userId = this._sharedService.uniqueRandomID(10);
    const userData = { ...this.signUpForm.value, userId };
    this.signUpForm.reset();

    this._sharedService.addNewUser(userData);
    this._sharedService.addNewUserID(userId);

    let alertsData = {
      message: 'Successfully Signed Up',
      color: SUCCESS_ALERT_CLASS,
    };

    this._sharedService.showAlerts(alertsData);

    this.router.navigate(['/']);
  }
}
