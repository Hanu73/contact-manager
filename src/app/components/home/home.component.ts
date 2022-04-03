import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/app/interfaces/IUserDetails';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: IUserDetails;
  fullName: string;
  constructor(
    private readonly _sharedService: SharedService,
    private readonly _storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this._sharedService.getCurrentUserDetails();
    const { firstname, lastname } = this.currentUser;
    this.fullName = `${firstname} ${lastname}`;
    console.log(this.currentUser);
  }

  triggerFeature(activity) {
    if (activity === 'createContact') {
      this.router.navigate(['/create-contacts']);
    } else if (activity === 'createGroup') {
      this.router.navigate(['/create-groups']);
    } else if (activity === 'view') {
      this.router.navigate(['/contacts-groups']);
    }
  }
}
