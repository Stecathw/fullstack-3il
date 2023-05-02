import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Contact} from '../types/contact';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})

export class ContactsListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Contact>();
  contacts: Contact[] = [];

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'genre', 'actions'];
  totalItems: number = 100;
  pageSize: number = 10;
  pageSizes: number[] = [4, 8, 12, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // It’s better to add definite assignment assertion to the property
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contactService: ContactService,
    private router: Router,
  ) {}  

  ngOnInit(): void {
    this.getContacts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateDataSource(): void {
    this.dataSource = new MatTableDataSource(this.contacts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getContacts(): void {
    this.contactService.getContacts()
      .subscribe(contacts => { 
          this.contacts = contacts
          this.updateDataSource();
        }
      );
  }

  sortData(event: any): void {
    function compare(a: string, b: string, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }    
    const data = this.contacts.slice();
    if (!event.active || event.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      const valueA = a.Genre.libelle.toLowerCase();
      const valueB = b.Genre.libelle.toLowerCase();
      return compare(valueA, valueB, isAsc);
    });
  }


  edit(id: number) {
    this.router.navigate(['/contacts/edit', id]);
  }

  delete(id: number) {
    this.contactService.deleteContact(id).subscribe(_ => {
      this.contacts = this.contacts.filter(c => c.id !== id);
      this.updateDataSource();
    });
  }

}
