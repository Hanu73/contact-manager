import { Injectable, OnInit } from '@angular/core';
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
  allGroups: any;

  modalPopup$ = new BehaviorSubject<any>([]);
  getModalPopupStatus = this.modalPopup$.asObservable();

  alertMessage$ = new BehaviorSubject<any>([]);
  getAlertMessages = this.alertMessage$.asObservable();

  groupId$ = new BehaviorSubject<any>('');
  getNewGroupId = this.groupId$.asObservable();
  groupDetails: any;

  constructor(
    private readonly _storageService: StorageService,
    private readonly router: Router
  ) {}

  showPopup(modalData: IModalPopup | boolean) {
    this.modalPopup$.next(modalData);
  }

  showAlerts(alertData) {
    this.alertMessage$.next(alertData);
  }

  setNewGroupId(groupId) {
    this.groupId$.next(groupId);
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
    this.allUsers = this.getAllUserDetails();
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
    this.allUsers = this.getAllUserDetails();
    this.currentUserDetails = this.getCurrentUserDetails();
    this.allUsers.map((user) => {
      if (user.userId === this.currentUserDetails.userId) {
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

  addGroupsForUser(groupDetails) {
    this.allUsers = this.getAllUserDetails();
    this.currentUserDetails = this.getCurrentUserDetails();
    this.allUsers.map((user) => {
      if (user.userId === this.currentUserDetails.userId) {
        const groups =
          user.groups && user.groups?.length
            ? [...user.groups, groupDetails]
            : [groupDetails];
        user.groups = groups;
        this.updateCurrentUser(user);
      }
    });
    this.updateAllusers(this.allUsers);
  }

  setGroupDetails(key, data) {
    this._storageService.setLocalStorage(key, JSON.stringify(data));
  }

  addNewGroup(newGroup) {
    this.allGroups = this.getAllGroupDetails();
    const updatedGroupsList =
      this.allGroups && this.allGroups?.length
        ? [...this.allGroups, newGroup]
        : [newGroup];
    this.updateAllGroups(updatedGroupsList);
  }

  getAllGroupDetails() {
    return JSON.parse(this._storageService.getLocalStorage('allGroups'));
  }

  updateAllGroups(updatedGroupsList) {
    this._storageService.setLocalStorage(
      'allGroups',
      JSON.stringify(updatedGroupsList)
    );
  }

  getGroupDetailsById(id: string) {
    this.allGroups = this.getAllGroupDetails();
    this.groupDetails = this.allGroups.filter((g) => g.groupId === id);
    return this.groupDetails;
  }

  getFullGroupDetailsOfCurrentUser(userId: string) {
    this.allGroups = this.getAllGroupDetails();
    const userGroups = this.allGroups.filter(
      (group) => group.createdBy === userId
    );
    return userGroups;
  }
}
