import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SearchClientComponent } from '../search-client/search-client.component';
import { DeleteClientComponent } from '../delete-client/delete-client.component';
@Component({
  selector: 'app-client',
  imports: [MatTableModule, MatFormFieldModule, MatDialogModule, SearchClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  dataSource = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },

    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
    },
  ];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dialog: any;
  applyFilter(filterValue: any) {
    const filterValueLower = filterValue.trim().toLowerCase();
    this.dataSource = this.dataSource.filter(client =>
      client.name.toLowerCase().includes(filterValueLower) ||
      client.email.toLowerCase().includes(filterValueLower) ||
      client.phone.toLowerCase().includes(filterValueLower)
    );
  }

  openDeleteClientModal(clientId: number): void {
    const dialogRef = this.dialog.open(DeleteClientComponent, {
      width: '250px',
      data: { id: clientId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'confirm') {
        this.deleteClient(clientId);
      }
    });
  }

  deleteClient(clientId: number): void {
    // Implement the logic to delete the client here
    console.log(`Client with ID ${clientId} has been deleted.`);
  }
  editClient(clientId: number): void {

    // Implement the edit client logic here

    console.log(`Editing client with ID: ${clientId}`);

  }
}
