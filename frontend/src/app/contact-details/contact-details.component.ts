import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContactService } from '../services/contact-service.service';

interface Civilite {
  value: number,
  viewValue: string,
}

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {

  genres: Civilite[] = [
    {value: 1, viewValue: 'Male'},
    {value: 2, viewValue: 'Female'},
    {value: 3, viewValue: 'Other'},
  ];

  contactForm = this.form.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    genre: [this.genres[0].value, Validators.required]
  });

  constructor(
    private form: FormBuilder,
    private contactService: ContactService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.isEditRoute()) {
      this.getContact(this.contactId());
    }
  }

  contactId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
  
  isEditRoute() {
    return this.contactId() ? true : false;
  }

  getContact(id: number) {
    this.contactService.getContact(id).subscribe(r => {
      this.contactForm.controls['firstname'].setValue(r.firstname)
      this.contactForm.controls['lastname'].setValue(r.lastname)
      this.contactForm.controls['genre'].setValue(r.genreId)
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const contactData = {
      firstname: this.contactForm.get('firstname')?.value || '',
      lastname: this.contactForm.get('lastname')?.value || '',
      genreId: this.contactForm.get('genre')?.value || this.genres[0].value,
    }   
    if (this.isEditRoute()) {
      const id = this.contactId();
      this.contactService.updateContact(id, contactData).subscribe(_ => this.goBack());
    } else {
      this.contactService.addContact(contactData).subscribe(_ => this.goBack());
    }
  }
}
