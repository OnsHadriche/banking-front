import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeleteClientComponent } from '../delete-client/delete-client.component';
import { ClientService } from '../../services/client.service';
import Client from '../../models/client.model';
import { MatButton } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SearchClientComponent } from '../search-client/search-client.component';

@Component({
  selector: 'app-client',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButton,
    MatInputModule,
    SearchClientComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  dataSource: Client[] = [];

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(
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
    'id',
    'firstname',
    'lastname',
    'details',
    "accounts",
    'edit',
    'delete',
  ];

  openDeleteClientModal(clientId: number): void {
    let dialogRef = this.dialog.open(DeleteClientComponent, {
      height: '250px',
      width: '200px',
      data: { id: clientId },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'confirm') {
        this.deleteClient(clientId);
      }
    });
  }

  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(
      () => {
        this.dataSource = this.dataSource.filter(
          (client) => client.cin !== clientId
        );
      },
      (error) => {
        console.error('There was an error deleting the client!', error);
      }
    );
  }
  editClient(clientId: number): void {
    console.log(`Editing client with ID: ${clientId}`);
    this.router.navigate(['/edit-client/', clientId]); // Navigates to form-edit route with clientId
  }

  detailsClient(clientId: number): void {
    console.log(`Details of client with ID: ${clientId}`);
    this.router.navigate(['/client-details/', clientId]); // Navigates to client-details route with clientId
  }
  getAllClientAccounts(clientId: number): void {
    console.log(`Details of client with ID: ${clientId}`);
    this.router.navigate(['/client-details-account/', clientId]);
  }
}
