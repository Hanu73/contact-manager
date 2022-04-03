import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = localStorage;
  constructor() {}

  setLocalStorage(item, data) {
    this.storage.setItem(item, data);
  }

  getLocalStorage(item) {
   return this.storage.getItem(item);
  }

  deleteLocalStorage(item) {
    this.storage.removeItem(item);
  }
}
