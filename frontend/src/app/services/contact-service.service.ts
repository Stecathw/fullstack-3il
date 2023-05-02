import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Contact, EditContact } from '../types/contact';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {  }

  getContacts(): Observable<Contact[]> {
    const url = `${this.contactsUrl}/all`;
    return this.http.get<Contact[]>(url).pipe(
      catchError(this.handleError<Contact[]>('getContacts', []))
    );   
  }

  getContact(id : Number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  addContact(contact: EditContact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact).pipe(
      catchError(this.handleError<Contact>(`addContact contact=${contact}`))
    );
  }

  updateContact(id: number, contact: EditContact): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`
    return this.http.put<Contact>(url, contact).pipe(
      catchError(this.handleError<Contact>(`updateContact contact=${contact}`))
    );
  }

  deleteContact(id: number): Observable<String> {
    const url = `${this.contactsUrl}/${id}`
    return this.http.delete<String>(url).pipe(
      catchError(this.handleError<String>(`deleteContact id=${id}`))
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
