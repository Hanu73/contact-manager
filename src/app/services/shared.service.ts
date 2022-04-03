import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IModalPopup } from '../interfaces/ImodalPopup';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentRoute: string;
  currentUserDetails: any;
  allUsers: any;

  modalPopup$ = new BehaviorSubject<any>([]);
  getModalPopupStatus = this.modalPopup$.asObservable();

  alertMessage$ = new BehaviorSubject<any>([]);
  getAlertMessages = this.alertMessage$.asObservable();

  constructor(
    private readonly _storageService: StorageService,
    private readonly router: Router
  ) {
    this.allUsers = this.getAllUserDetails();
    this.currentUserDetails = this.getCurrentUserDetails();
  }

  //random id generator
  uniqueRandomID = (length) => {
    let result = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const allUniqueIds = this.getUniqueIDs();
    allUniqueIds?.includes(result) ? this.uniqueRandomID(length) : '';
    return result;
  };

  showPopup(data: IModalPopup | boolean) {
    console.log(data);
    this.modalPopup$.next(data);
  }

  showAlerts(data) {
    console.log(data);
    this.alertMessage$.next(data);
  }

  getUniqueIDs() {
    return JSON.parse(this._storageService.getLocalStorage('allUserIds'));
  }

  getAllUserDetails() {
    return JSON.parse(this._storageService.getLocalStorage('allUsers'));
  }

  updateAllusers(updatedUsersList) {
    this._storageService.setLocalStorage(
      'allUsers',
      JSON.stringify(updatedUsersList)
    );
  }

  addNewUser(newUser) {
    const updatedUsersList =
      this.allUsers && this.allUsers?.length
        ? [...this.allUsers, newUser]
        : [newUser];
    this.updateAllusers(updatedUsersList);
  }

  addNewUserID(newUserID: string) {
    const uniqueIDs = this.getUniqueIDs();
    const allUniqueIDs =
      uniqueIDs && uniqueIDs?.length ? [...uniqueIDs, newUserID] : [newUserID];
    this._storageService.setLocalStorage(
      'allUserIds',
      JSON.stringify(allUniqueIDs)
    );
  }

  currentUser(userDetails) {
    this._storageService.setLocalStorage(
      'currentUser',
      JSON.stringify(userDetails)
    );
  }

  updateCurrentUser(userDetails) {
    this.currentUser(userDetails);
  }

  getCurrentUserDetails() {
    return JSON.parse(this._storageService.getLocalStorage('currentUser'));
  }

  isUserLoggedIn() {
    return this._storageService.getLocalStorage('currentUser');
  }

  userLogout() {
    this._storageService.deleteLocalStorage('currentUser');
  }

  addContactsForUser(contactDetails) {
    this.allUsers.map((user) => {
      if (user.id === this.currentUserDetails.id) {
        const contacts =
          user.contacts && user.contacts?.length
            ? [...user.contacts, contactDetails]
            : [contactDetails];
        user.contacts = contacts;
        this.updateCurrentUser(user);
      }
    });
    this.updateAllusers(this.allUsers);
  }
}
