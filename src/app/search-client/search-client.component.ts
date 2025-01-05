import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { MatListModule } from '@angular/material/list';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './search-client.component.html',
  styleUrl: './search-client.component.css',
})
export class SearchClientComponent {
  searchQuery: string = '';

  searchResults: any[] = [];

  onSearch(): void {
    // Implement search logic here

    console.log('Search query:', this.searchQuery);
  }
}
