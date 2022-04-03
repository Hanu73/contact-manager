import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { GroupsComponent } from './groups/groups.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactComponent, GroupsComponent, ListComponent],
  imports: [CommonModule, ReactiveFormsModule, BrowserModule, RouterModule],
  exports: [ContactComponent, GroupsComponent, ListComponent],
})
export class ContactsModule {}
