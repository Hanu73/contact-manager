import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  SUCCESS_ALERT_CLASS,
  VALID_PHONE_NUMBER_LENGTH,
} from 'src/app/constants';
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
  allGroups: any;
  subscription: any;

  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    this.currentUser = this._sharedService.getCurrentUserDetails();
    this.contactForm = new FormGroup({
      groupid: new FormControl('default', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', [Validators.required]),
      nickname: new FormControl(''),
      active: new FormControl('true'),
      createdBy: new FormControl(''),
    });
    this.getAllGroups();
    this.getGroupIdFromGroupPage();
  }

  getAllGroups() {
    this.allGroups = this._sharedService.getAllGroupDetails();
  }

  getGroupIdFromGroupPage() {
    this.subscription = this._sharedService.getNewGroupId.subscribe(
      (selectedGroupId) => {
        if (selectedGroupId) {
          this.contactForm.patchValue({
            groupid: selectedGroupId,
          });
        }
      }
    );
  }

  checkPhoneNumberValidation(val) {
    this.showPhoneNumberError =
      val.toString().length !== VALID_PHONE_NUMBER_LENGTH;
  }

  create() {
    if (this.contactForm.valid) {
      const { userId } = this.currentUser;
      this.contactForm.patchValue({
        createdBy: userId,
      });
      this._sharedService.addContactsForUser(this.contactForm.value);
      let alertsData = {
        message: 'Successfully Created the Contact',
        color: SUCCESS_ALERT_CLASS,
      };

      this._sharedService.showAlerts(alertsData);
      this.contactForm.reset();
      this.contactForm.patchValue({
        groupid: 'default',
      });
    }
  }
}
