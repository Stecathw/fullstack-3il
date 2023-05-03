import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Ticket, UpdateTicket } from '../types/ticket';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {  }

  getTickets(): Observable<Ticket[]> {
    const url = `${this.ticketsUrl}/all`;
    return this.http.get<Ticket[]>(url).pipe(
      catchError(this.handleError<Ticket[]>('getTickets', []))
    );   
  }

  getTicket(id : number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url).pipe(
      catchError(this.handleError<Ticket>(`getTicket id=${id}`))
    );
  }

  addTicket(ticket: UpdateTicket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket).pipe(
      catchError(this.handleError<Ticket>(`addTicket ticket=${ticket}`))
    );
  }

  updateTicket(id: number, ticket: UpdateTicket): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`
    return this.http.put<Ticket>(url, ticket).pipe(
      catchError(this.handleError<Ticket>(`updateTicket ticket${ticket}`))
    );
  }

  deleteTicket(id: number): Observable<string> {
    const url = `${this.ticketsUrl}/${id}`
    return this.http.delete<string>(url).pipe(
      catchError(this.handleError<string>(`deleteTicket id=${id}`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(`${operation} failed: ${error.message}`)
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
