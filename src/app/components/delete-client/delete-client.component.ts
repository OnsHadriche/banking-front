import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-client',
  imports: [MatDialogModule,MatButton],
  templateUrl: './delete-client.component.html',
  styleUrl: './delete-client.component.css'
})
export class DeleteClientComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cin: string }
  ) {}




  onCancelClick(): void {
    this.dialogRef.close();
  }


  onDeleteClick(): void {

    this.dialogRef.close('confirm');

  }
}
