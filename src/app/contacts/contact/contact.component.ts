import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VALID_PHONE_NUMBER_LENGTH } from 'src/app/constants';
import { IUserDetails } from 'src/app/interfaces/IUserDetails';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  currentUser: IUserDetails;
  showPhoneNumberError = false;
  newContacts: any;
  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    this.currentUser = this._sharedService.getCurrentUserDetails();
    this.contactForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl(''),
      email: new FormControl('', Validators.required),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.max(10),
        Validators.min(10),
      ]),
      nickname: new FormControl(''),
      active: new FormControl(''),
    });
  }

  checkPhoneNumberValidation(val) {
    this.showPhoneNumberError =
      val.toString().length !== VALID_PHONE_NUMBER_LENGTH;
  }

  create() {
    const active = true;
    const contactDetails = { ...this.contactForm.value, active };
    this._sharedService.addContactsForUser(contactDetails);
    console.log(this._sharedService.getAllUserDetails())
  }
}
