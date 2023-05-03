import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './ticket-list/tickets-list.component';
import { TicketDetailsComponent } from './contact-details/ticket-details.component';

const routes: Routes = [
  {path: '', redirectTo:'/tickets', pathMatch:'full'},
  {path: 'tickets', component: TicketsListComponent},
  {path: 'tickets/add', component: TicketDetailsComponent},
  {path: 'tickets/edit/:id', component: TicketDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

