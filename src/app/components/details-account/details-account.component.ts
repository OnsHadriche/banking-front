import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-details-account',
  imports: [
    FormsModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatButton,
    MatInputModule,
    ToastModule
  ],
  templateUrl: './details-account.component.html',
  styleUrl: './details-account.component.css',
})
export class DetailsAccountComponent {
  account: any;
  errorMessage: string | null = null;
  depositAmount: number = 0;
  withdrawAmount: number = 0;
  accountId: number | null = null;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get accountId from route parameters
    this.route.paramMap.subscribe((params) => {
      this.accountId = params.get('accountId')
        ? +params.get('accountId')!
        : null;
      if (this.accountId) {
        this.loadAccountDetails(this.accountId);
      }
    });
  }

  // Fetch account details from the service
  loadAccountDetails(accountId: number): void {
    this.accountService.getAccountByRib(accountId).subscribe(
      (account) => {
        this.account = account;
        this.errorMessage = null; // Reset error message if account is found
      },
      (error) => {
        this.errorMessage = 'Failed to load account details.';
        console.error(error);
      }
    );
  }

  // Handle deposit logic
  onDeposit(): void {
    if (this.depositAmount <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Amount',
        detail: 'Please enter a valid deposit amount.',
      });
      return;
    }

    const accountId = this.route.snapshot.paramMap.get('accountId'); // Get the account ID from route parameters
    if (!accountId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Account Not Found',
        detail: 'Unable to find the account for this deposit.',
      });
      return;
    }

    const accountIdNumber: number = +accountId;

    this.accountService.depositMoney(accountIdNumber, this.depositAmount).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deposit Successful',
          detail: `Deposited ${this.depositAmount} into account.`,
        });
        this.account.balance += this.depositAmount; // Update the balance after a successful API call
        this.depositAmount = 0; // Reset deposit amount after success
        this.router.navigate(['account-banking']); // Navigate back to the accounts page
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Deposit Failed',
          detail: 'Failed to deposit amount. Please try again.',
        });
        console.error('Deposit error:', error);
      }
    );
  }

  // Handle withdraw logic
  onWithdraw(): void {
    if (
      this.withdrawAmount <= 0 ||
      this.withdrawAmount > this.account.balance
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Withdraw Amount',
        detail:
          'Please enter a valid withdraw amount less than or equal to the balance.',
      });
      return;
    }

    // Subtract withdrawAmount from the account's balance
    const accountId = this.route.snapshot.paramMap.get('accountId'); // Make sure the parameter name matches
    if (accountId) {
      const accountIdNumber: number = +accountId;
      //this.account.balance -= this.withdrawAmount;

      this.accountService
        .withdrawMoney(accountIdNumber, this.withdrawAmount)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Withdrawal Successful',
              detail: `Withdrawn ${this.withdrawAmount} from account.`,
            });
            this.withdrawAmount = 0; // Reset withdraw amount after success
            // Redirect to the list of accounts after successful withdrawal
            this.router.navigate(['/account-banking']);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Withdrawal Failed',
              detail: 'Failed to withdraw amount.',
            });
            console.error(error);
          }
        );
    }
  }
}
