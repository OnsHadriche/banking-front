import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Client from '../../models/client.model';
import { map, Observable, startWith } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fomr-edit-account',
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
  templateUrl: './fomr-edit-account.component.html',
  styleUrl: './fomr-edit-account.component.css',
})
export class FomrEditAccountComponent {
  accounteditForm!: FormGroup;
  filteredClients: Observable<Client[]> = new Observable<Client[]>();
  accountId: number | null = null; // To store account id for editing

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService // To access route parameters like accountId
  ) {}

  ngOnInit(): void {
    // Fetch the accountId from the route parameters
    this.route.paramMap.subscribe((params) => {
      const accountId = params.get('accountId'); // Make sure the parameter name matches your route definition
      if (accountId) {
        this.accountId = +accountId; // Convert to number
        this.loadAccountDetails(this.accountId);
      }
    });

    // Initialize form
    this.accounteditForm = this.fb.group({
      balance: [null, [Validators.required]],
      // Add more fields if needed, like 'cin', 'email', etc.
    });
  }

  // Fetch account details and populate the form
  loadAccountDetails(accountId: number): void {
    this.accountService.getAccountByRib(accountId).subscribe((account) => {
      // Populate the form with fetched account data
      this.accounteditForm.patchValue({
        balance: account.balance,
        // You can add other fields like cin, email if required
      });
    });
  }

  // Submit form to update the account
  onSubmit(): void {
    if (this.accounteditForm.valid) {
      const { balance } = this.accounteditForm.value;

      // Get accountId from the route parameters
      const accountId = this.route.snapshot.paramMap.get('accountId'); // Make sure the parameter name matches
      if (accountId) {
        const accountIdNumber: number = +accountId;

        // Prepare the account object for updating
        const updatedAccount: any = {
          balance: balance,
        };

        // Ensure accountId exists
        if (accountIdNumber !== null && accountIdNumber !== undefined) {
          this.accountService.updateAccount(accountIdNumber, updatedAccount).subscribe(
            (updatedAccount) => {
              console.log(updatedAccount);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Account updated successfully!',
              });
              this.accounteditForm.reset();
              window.location.href = '/accounts-banking'; // Redirect to the accounts list
            },
            (error) => {
              console.error('Error updating account:', error);
              alert('Failed to update account.');
            }
          );
        } else {
          console.error('Account ID is missing.');
          alert('Account ID is missing. Unable to update.');
        }
      } else {
        console.error('Account ID is not found in the route.');
        alert('Account ID is missing. Unable to update.');
      }
    } else {
      console.error('Form is invalid.');
      alert('Please fill out all required fields.');
    }
  }
}
