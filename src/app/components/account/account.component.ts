import { Component } from '@angular/core';
import Account from '../../models/account.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SearchClientComponent } from '../search-client/search-client.component';
import { SearchAccountComponent } from "../../search-account/search-account.component";

@Component({
  selector: 'app-account',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButton,
    MatInputModule,
    SearchAccountComponent
],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  dataSource: Account[] = [];

  constructor(
    private acccoutService: AccountService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.acccoutService.getAllAccounts().subscribe(
      (data) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
      (error) => {
        console.error('There was an error retrieving the clients!', error);
      }
    );
  }

  displayedColumns: string[] = [
    'rib',
    'balance',
    'lastname',
    'client_id',
    'edit',
    'delete',
    'details',
  ];

  openDeleteAccountModal(clientId: number): void {
    let dialogRef = this.dialog.open(DeleteAccountComponent, {
      height: '250px',
      width: '200px',
      data: { id: clientId },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'confirm') {
        this.deleteAccount(clientId);
      }
    });
  }

  deleteAccount(id: number): void {
    this.acccoutService.deleteAccount(id).subscribe(
      () => {
        this.dataSource = this.dataSource.filter(
          (account) => account.rib !== id
        );
      },
      (error) => {
        console.error('There was an error deleting the client!', error);
      }
    );
  }
  editAccount(id: number): void {
    console.log(`Editing client with ID: ${id}`);
    this.router.navigate(['/edit-account/', id]); // Navigates to form-edit route with clientId
  }

  detailsAccount(id: number): void {
    console.log(`Details of client with ID: ${id}`);
    this.router.navigate(['/account-details/', id]); // Navigates to client-details route with clientId
  }
}
