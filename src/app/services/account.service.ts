import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import Account from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.apiBaseUrl}/accounts`;  // Assuming your API base URL is defined in environment.ts

  constructor(private http: HttpClient) {}

  // Get account by RIB
  getAccountByRib(rib: number): Observable<Account> {
    return this.http
      .get<Account>(`${this.apiUrl}/${rib}`)
      .pipe(catchError(this.handleError));
  }

  // Create a new account
  createNewAccount(account: Account, clientId: number): Observable<Account> {
    return this.http
      .post<Account>(`${this.apiUrl}/create-account?clientId=${clientId}`, account)
      .pipe(catchError(this.handleError));
  }

  // Get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Update account by RIB
  updateAccount(rib: number, account: Account): Observable<Account> {
    return this.http
      .put<Account>(`${this.apiUrl}/update/${rib}`, account)
      .pipe(catchError(this.handleError));
  }

  // Delete account by RIB
  deleteAccount(rib: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/delete/${rib}`)
      .pipe(catchError(this.handleError));
  }

  // Withdraw money from an account
  withdrawMoney(rib: number, amount: number): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/${rib}/withdraw?amount=${amount}`, {})
      .pipe(catchError(this.handleError));
  }

  // Deposit money into an account
  depositMoney(rib: number, amount: number): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/${rib}/deposit?amount=${amount}`, {})
      .pipe(catchError(this.handleError));
  }

  // Get accounts by client's CIN
  getAccountsByClientCin(clientCin: number): Observable<Account[]> {
    return this.http
      .get<Account[]>(`${this.apiUrl}/client/${clientCin}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
