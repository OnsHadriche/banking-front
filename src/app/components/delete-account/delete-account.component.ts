import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-account',
  imports: [
    MatDialogModule,
    MatButton
  ],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {
constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cin: string }
  ) {}




  onCancelClick(): void {
    this.dialogRef.close();
  }


  onDeleteClick(): void {

    this.dialogRef.close('confirm');

  }
}
