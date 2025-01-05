import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { MatListModule } from '@angular/material/list';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-search-client',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: './search-client.component.html',
  styleUrl: './search-client.component.css',
})
export class SearchClientComponent {
  searchQuery: string = '';
  errorMessage: string = '';
  searchResults: any[] = [];

  constructor(
    private clientService: ClientService,
    private messageService: MessageService
  ) {}
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Input Required',
        detail: 'Please enter a valid client name.',
      });
      return;
    }

    const [firstName, lastName] = this.searchQuery.split(' ');


    this.clientService.getClientByName(firstName, lastName || '').subscribe({
      next: (data) => {
        console.log('Search Query:', firstName, lastName);

        this.searchResults = [data];
        console.log(this.searchQuery)
        this.messageService.add({
          severity: 'success',
          summary: 'Client Found',
          detail: 'Client found successfully.',
        });
      },
      error: (err) => {
        console.error('API Error:', err);
        this.searchResults = [];
        this.messageService.add({
          severity: 'error',
          summary: 'Search Failed',
          detail: err.message || 'Client not found.',
        });
      },
    });
  }
  onClear(): void {
    this.searchQuery = '';
    this.searchResults = [];
  }
}
