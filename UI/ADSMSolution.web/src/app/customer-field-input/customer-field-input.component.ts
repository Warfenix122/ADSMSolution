import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-field-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-field-input.component.html',
  styleUrl: './customer-field-input.component.css'
})
export class CustomerFieldInputComponent {
  @Input() formGroup!: FormGroup
   @Input() controlName!: string
}
