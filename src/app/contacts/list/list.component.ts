import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  currentUser: any;
  contacts: any;
  groups: any;

  constructor(private readonly _sharedService: SharedService) {}

  ngOnInit(): void {
    this.currentUser = this._sharedService.getCurrentUserDetails();
    this.contacts = this.currentUser.contacts;
    this.groups = this._sharedService.getFullGroupDetailsOfCurrentUser(
      this.currentUser.userId
    );
  }
}
