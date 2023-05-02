import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

const routes: Routes = [
  {path: '', redirectTo:'/contacts', pathMatch:'full'},
  {path: 'contacts', component: ContactsListComponent},
  {path: 'contacts/add', component: ContactDetailsComponent},
  {path: 'contacts/edit/:id', component: ContactDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

