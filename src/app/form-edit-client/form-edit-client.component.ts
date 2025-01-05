import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-form-edit-client',
  imports: [
    MatCardModule,

    MatFormFieldModule,

    MatInputModule,

    MatButtonModule,

    ReactiveFormsModule,
  ],
  templateUrl: './form-edit-client.component.html',
  styleUrl: './form-edit-client.component.css',
})
export class FormEditClientComponent {
  editClientForm: FormGroup;
  ngOnInit(): void {
    this.editClientForm = this.fb.group({
      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      phoneNumber: ['', Validators.required],

      address: ['', Validators.required],
    });
  }
  constructor(private fb: FormBuilder) {
    this.editClientForm = this.fb.group({
      // Define your form controls and validators here
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add other form controls as needed
    });
  }

  onSubmit() {
    // Add your form submission logic here

    console.log('Form submitted', this.editClientForm.value);
  }

  onCancel(): void {
    // Implement your cancel logic here

    console.log('Cancel button clicked');
  }
}
