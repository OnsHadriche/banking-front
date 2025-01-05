import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  ],
  templateUrl: './form-create-client.component.html',
  styleUrls: ['./form-create-client.component.css']
})
export class FormCreateClientComponent implements OnInit {
  clientForm!: FormGroup;
  clientTypeOptions: string[] = ['Type 1', 'Type 2', 'Type 3', 'Type 4']; // Example options
  filteredOptions!: Observable<string[]>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientType: ['']
    });

    this.filteredOptions = this.clientForm.get('clientType')!.valueChanges.pipe(
      startWith(''), // Start with an empty string
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clientTypeOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      console.log('Form Submitted', this.clientForm.value);
    }
  }
}
