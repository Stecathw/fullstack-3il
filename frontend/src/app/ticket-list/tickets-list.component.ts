import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Ticket} from '../types/ticket';
import { Router } from '@angular/router';
import { TicketService } from '../services/ticket-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css'],
})

export class TicketsListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Ticket>();
  tickets: Ticket[] = [];

  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];
  totalItems = 50;
  pageSize = 4;
  pageSizes: number[] = [4, 8, 12];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // It’s better to add definite assignment assertion to the property
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ticketService: TicketService,
    private router: Router,
  ) {}  

  ngOnInit(): void {
    this.getTickets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isDeleteButtonDisabled(ticketStatus: string): boolean {
    return ticketStatus === 'TERMINE';
  }  

  updateDataSource(): void {
    this.dataSource = new MatTableDataSource(this.tickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTickets(): void {
    this.ticketService.getTickets()
      .subscribe(tickets => { 
          this.tickets = tickets
          this.updateDataSource();
        }
      );
  }

  edit(id: number) {
    this.router.navigate(['/tickets/edit', id]);
  }

  delete(id: number) {
    // if (this.tickets[id] && this.tickets[id].status === TERMINE) {
    //   // Delete the ticket using your Prisma Client instance
    // } else {
    //   // Show an error message to the user
    //   alert('This ticket cannot be deleted because its status is not TERMINÉ');
    // }
    this.ticketService.deleteTicket(id).subscribe(_ => {
      this.tickets = this.tickets.filter(c => c.id !== id);
      this.updateDataSource();
    });
  }

}
