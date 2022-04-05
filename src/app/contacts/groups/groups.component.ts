import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/app/interfaces/IUserDetails';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  groupForm: FormGroup;
  currentUser: IUserDetails;
  groupImage: string;
  constructor(
    private readonly _sharedService: SharedService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this._sharedService.getCurrentUserDetails();
    this.groupForm = new FormGroup({
      groupname: new FormControl('', Validators.required),
      groupimage: new FormControl(''),
      active: new FormControl('true'),
      groupId: new FormControl(''),
      createdBy: new FormControl(''),
    });
  }

  uploadImage(e) {
    const file = e.target.files[0];
    if (file) {
      this.getBase64(file).then((url: string) => {
        this.groupImage = url;
        this.groupForm.patchValue({
          groupimage: this.groupImage,
        });
      });
    }
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  create() {
    if (this.groupForm.valid) {
      const uniqueID = this._sharedService.uniqueRandomID(10);
      this.groupForm.patchValue({
        groupId: uniqueID,
      });

      const { groupId } = this.groupForm.value;
      const groups = { groupId };
      this._sharedService.addGroupsForUser(groups);
      const { userId } = this.currentUser;
      this.groupForm.patchValue({
        createdBy: userId,
      });

      this._sharedService.addNewGroup(this.groupForm.value);
      this._sharedService.setNewGroupId(this.groupForm.value.groupId);
      this.router.navigate(['/create-contacts']);
    }

  }
}
