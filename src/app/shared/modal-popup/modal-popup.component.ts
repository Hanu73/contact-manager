import { Component, Input, OnInit } from '@angular/core';
import { IModalPopup } from 'src/app/interfaces/ImodalPopup';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
})
export class ModalPopupComponent implements OnInit {
  subscription: any;
  modalData: IModalPopup;
  showPopup = false;
  constructor(private readonly _sharedService: SharedService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.subscription = this._sharedService.getModalPopupStatus.subscribe(
      (data: IModalPopup) => {
        if (data.value) {
          this.showPopup = true;
          this.modalData = data;
        } else {
          this.showPopup = false;
        }
      }
    );
  }

  closePopup() {
    this._sharedService.showPopup(false);
  }

  ngOnDestroy() {
    this.subscription = this._sharedService.showPopup(false);
    this.subscription.unsubscribe();
  }
}
