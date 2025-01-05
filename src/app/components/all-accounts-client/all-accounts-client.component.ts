import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-accounts-client',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,

    MatInputModule,
  ],
  templateUrl: './all-accounts-client.component.html',
  styleUrl: './all-accounts-client.component.css',
})
export class AllAccountsClientComponent {
  displayedColumns: string[] = [
    'rib',
    'balance',

  ]
  dataSource: any[] = [];
  clientId!: number;
  accounts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService // Optional for notifications
  ) {}

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!; // Fetch clientId from route params
    this.fetchClientAccounts();
  }

  fetchClientAccounts(): void {
    this.accountService.getAccountsByClientCin(this.clientId).subscribe(
      (data) => {
        this.accounts = data;
        this.dataSource = this.accounts;
        console.log('Fetched accounts:', data);
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Fetch Failed',
          detail: 'Could not fetch client accounts.',
        });
      }
    );
  }
}
