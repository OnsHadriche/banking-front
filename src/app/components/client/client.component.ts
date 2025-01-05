import { Component, OnInit } from '@angular/core';
import { MatCell, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeleteClientComponent } from '../delete-client/delete-client.component';
import { ClientService } from '../../services/client.service';
import Client from '../../models/client.model';
import { MatButton } from '@angular/material/button';
import { first } from 'rxjs';
@Component({
  selector: 'app-client',
  imports: [MatTableModule, MatFormFieldModule, MatDialogModule,MatButton],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  dataSource: Client[] = [];

  constructor(private clientService: ClientService,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.dataSource = data;
        console.log(this.dataSource)
      },
      (error) => {
        console.error('There was an error retrieving the clients!', error);
      }
    );
  }

  displayedColumns: string[] = ['id', 'firstname', 'lastname','edit', 'delete'];

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
        this.dataSource = this.dataSource.filter(client => client.cin !== clientId);
      },
      (error) => {
        console.error('There was an error deleting the client!', error);
      }
    );
  }
  editClient(clientId: number): void {


    console.log(`Editing client with ID: ${clientId}`);

  }
}
