import { Component, Injectable, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import Client from '../../models/client.model';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-form-create-client',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatInputModule,
    ToastModule,

],
  templateUrl: './form-create-client.component.html',
  styleUrls: ['./form-create-client.component.css'],
})
@Injectable({
  providedIn: 'root'
})
export class FormCreateClientComponent implements OnInit {
  clientForm!: FormGroup;
  isSubmitting = false; // Track submission status
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private clientService: ClientService,  private messageService: MessageService) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      cin: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      const newClient: Client = this.clientForm.value;

      // Call the ClientService to create a new client
      this.clientService.createClient(newClient).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Client created successfully!',
          });
          this.clientForm.reset();
            window.location.href = '/clients';
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create client. Please try again.',
          });
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill in all required fields.',
      });
    }
  }
}
