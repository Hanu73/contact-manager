import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskManagementSharedService } from '../services/task.management-shared-service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  display: any;
  subscription: any;
  constructor(private _sharedService : TaskManagementSharedService) { }

  ngOnInit(): void {
    this.subscription = this._sharedService.getLoaderStatus.subscribe(
      (val) =>{
        !Array.isArray(val) ? this.display = val: this.display = false;
      }
    )
  }
  ngOnDestroy(){
    this.subscription = this._sharedService.showLoader(false)
    this.subscription.unsubscribe()
  }
}
