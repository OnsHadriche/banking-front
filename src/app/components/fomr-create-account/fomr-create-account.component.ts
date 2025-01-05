import { Component } from '@angular/core';
import Client from '../../models/client.model';
import { map, Observable, startWith } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ClientService } from '../../services/client.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import Account from '../../models/account.model';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fomr-create-account',
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
  templateUrl: './fomr-create-account.component.html',
  styleUrl: './fomr-create-account.component.css',
})
export class FomrCreateAccountComponent {
  displayClient: ((value: any) => string) | null = null;
  onClientCINInput($event: Event) {
    throw new Error('Method not implemented.');
  }
  clients: Client[] = [];
  filteredClients: Observable<Client[]> = new Observable<Client[]>();
  accountForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Fetch clients from API
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
      this.filteredClients = this.accountForm.controls['cin'].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });

    // Initialize the form
    this.accountForm = this.fb.group({
      balance: [null, [Validators.required]],
      cin: [null, [Validators.required]], // 'cin' field for the client ID
    });
  }

  private _filter(value: string): Client[] {
    const filterValue = value;
    return this.clients.filter((client) =>
      client.cin.toString().includes(filterValue)
    );
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      const { balance, cin } = this.accountForm.value;

      // Prepare the account object for submission (No need to include the RIB, as it's auto-generated)
      const newAccount: any = {
        balance: balance,
        // You only need to send the client CIN
      };

      // Create the account through the account service
      this.accountService.createNewAccount(newAccount, cin).subscribe(
        (createdAccount) => {
          alert('Account created successfully!');
          this.accountForm.reset();

          window.location.href = '/accounts';
        },
        (error) => {
          console.error('Error creating account:', error);
          alert('Failed to create account.');
        }
      );
    }
  }
}
