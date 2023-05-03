import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TicketService } from '../services/ticket-service.service';


@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})

export class TicketDetailsComponent implements OnInit {

  status: any[] = [
    {value: 'A_FAIRE', viewValue: 'A faire'},
    {value: 'EN_COURS', viewValue: 'En cours'},
    {value: 'TERMINE', viewValue: 'Terminé'},
  ];

  ticketForm = this.form.group({
    title: ['', Validators.required],
    description: [''],
    status: [this.status[0].value]
  });

  constructor(
    private form: FormBuilder,
    private ticketService: TicketService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.isEditRoute()) {
      this.getTicket(this.ticketId());
    } else {
      this.ticketForm.controls['status'].setValue(this.status[0].value);
      this.ticketForm.get('status')?.disable();
    }
  }

  ticketId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
  
  isEditRoute() {
    return this.ticketId() ? true : false;
  }

  getTicket(id: number) {
    this.ticketService.getTicket(id).subscribe(r => {
      this.ticketForm.controls['title'].setValue(r.title)
      this.ticketForm.controls['description'].setValue(r.description ||'')
      this.ticketForm.controls['status'].setValue(r.status)
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const ticketData = {
      title: this.ticketForm.get('title')?.value || '',
      description: this.ticketForm.get('description')?.value || '',
      status: this.ticketForm.get('status')?.value || this.status[0].value,
    }   
    if (this.isEditRoute()) {
      const id = this.ticketId();
      this.ticketService.updateTicket(id, ticketData).subscribe(_ => this.goBack());
    } else {
      this.ticketService.addTicket(ticketData).subscribe(_ => this.goBack());
    }
  }
}
