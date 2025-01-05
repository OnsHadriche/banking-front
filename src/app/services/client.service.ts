import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import Client from '../models/client.model';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

private apiUrl = `${environment.apiBaseUrl}/clients`; // Make sure to replace with actual API URL

  constructor(private http: HttpClient) { }

  // Create a new client
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/create`, client);
  }

  // Get a client by ID
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Get all clients
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Update a client
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/update/${id}`, client);
  }

  // Delete a client
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Get client by first and last name
  getClientByName(firstName: string, lastName: string): Observable<Client> {
    const url = `${this.apiUrl}?firstName=${firstName}&lastName=${lastName}`;
    return this.http.get<Client>(url).pipe(
      catchError(this.handleError)
    );
  }
}
