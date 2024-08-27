import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerFieldInputComponent } from '../customer-field-input/customer-field-input.component';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-customer-add-component',
  standalone: true,
  imports: [ReactiveFormsModule,CustomerFieldInputComponent,NgClass],
  templateUrl: './customer-add-component.component.html',
  styleUrl: './customer-add-component.component.css'
})
export class CustomerAddComponentComponent {
  http = inject(HttpClient)
  dynamicForm: FormGroup = new FormGroup({});
  isModalOpen = false;

  constructor(private fb: FormBuilder){}

  openModal(){
    console.log(this.isModalOpen)
    this.isModalOpen = true;
  }

  closeModal(){
    console.log(this.isModalOpen)
    this.isModalOpen = false;
  }

  

  ngOnInit(){
    this.dynamicForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formControls(){
    return Object.keys(this.dynamicForm.controls)
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value)
      //const customer: Customer = this.dynamicForm.value;
      //this.sendPostRequest(customer);
    }
  }

  /*sendPostRequest(customer: Customer) {
    const apiUrl = 'https://api.example.com/customers'; // Replace with your API endpoint

    this.http.post(apiUrl, customer).subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Error:', error)
    });
  }*/
}
