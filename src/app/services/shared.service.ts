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
  modalPopup$ = new BehaviorSubject<any>([]);
  getModalPopupStatus = this.modalPopup$.asObservable();

  alertMessage$ = new BehaviorSubject<any>([]);
  getAlertMessages = this.alertMessage$.asObservable();

  constructor(
    private readonly _storageService: StorageService,
    private readonly router: Router
  ) {}

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
    return JSON.parse(this._storageService.getLocalStorage('userID'));
  }

  getAllUserDetails() {
    return JSON.parse(this._storageService.getLocalStorage('userDetails'));
  }

  addNewUser(newUser) {
    const allUsers = this.getAllUserDetails();
    const updatedUsersList =
      allUsers && allUsers.length ? [...allUsers, newUser] : [newUser];
    this._storageService.setLocalStorage(
      'userDetails',
      JSON.stringify(updatedUsersList)
    );
  }
  addNewUserID(newUserID: string) {
    const uniqueIDs = this.getUniqueIDs();
    const allUniqueIDs =
      uniqueIDs && uniqueIDs?.length ? [...uniqueIDs, newUserID] : [newUserID];
    this._storageService.setLocalStorage(
      'userID',
      JSON.stringify(allUniqueIDs)
    );
  }

  currentUser(userDetails) {
    this._storageService.setLocalStorage(
      'currentUser',
      JSON.stringify(userDetails)
    );
  }

  userLogout() {
    this._storageService.deleteLocalStorage('currentUser');
  }
}
