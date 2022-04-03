import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from '../services/guards/login-guard.service';
import { ContactComponent } from './contact/contact.component';
import { GroupsComponent } from './groups/groups.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'create-contacts',
    component: ContactComponent,
  },
  {
    path: 'create-groups',
    component: GroupsComponent,
  },
  {
    path: 'contacts-groups',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
