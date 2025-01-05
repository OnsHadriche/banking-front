import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import Client from '../../models/client.model';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-details',
  imports: [MatCardModule,CommonModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css',
})
export class ClientDetailsComponent {
  clientId!: number;
  client!: Client;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    // Get the clientId from the route parameters
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;
    console.log('Client ID:', this.clientId);

    // Fetch the client details from the server
    this.clientService.getClientById(this.clientId).subscribe(
      (client: Client) => {
        this.client = client;
        console.log('Client Details:', this.client); // Debugging the client data
      },
      (error) => {
        this.errorMessage = 'Error fetching client details';
        console.error('Error:', error);
      }
    );
  }
}
