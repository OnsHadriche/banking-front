import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import Client from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-form-edit-client',
  imports: [
    MatCardModule,

    MatFormFieldModule,

    MatInputModule,

    MatButtonModule,

    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './form-edit-client.component.html',
  styleUrl: './form-edit-client.component.css',
})
export class FormEditClientComponent {
  editClientForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!; // Get clientId from the route
    console.log('Client ID:', this.clientId);
    this.loadClientData();

    this.editClientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', [Validators.required]],
    });
  }

  // Fetch client data by ID
  loadClientData() {
    this.clientService.getClientById(this.clientId).subscribe(
      (client: Client) => {
        this.editClientForm.patchValue(client); // Pre-fill the form with client data
      },
      (error) => {
        console.error('Error fetching client data', error);
      }
    );
  }

  // Handle form submission
  onSubmit() {
    if (this.editClientForm.valid) {
      const updatedClient = this.editClientForm.value;
      this.clientService.updateClient(this.clientId, updatedClient).subscribe(
        (client) => {
          console.log('Client updated', client);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Client updated successfully!',
          }); // Show success toast

          this.router.navigate(['/clients']); // Redirect after successful update
        },
        (error) => {
          console.error('Error updating client', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'There was an error updating the client.',
          }); // Show error toast
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill out all required fields.',
      }); // Show warning toast for incomplete form
    }
  }

  // Handle cancel action
  onCancel(): void {
    this.router.navigate(['/clients']); // Redirect to client list
  }
}
