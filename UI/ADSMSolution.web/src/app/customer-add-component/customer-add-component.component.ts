import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerFieldInputComponent } from '../customer-field-input/customer-field-input.component';
import { NgClass } from '@angular/common';
import { Customer } from '../../Modules/Customer.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';



@Component({
  selector: 'app-customer-add-component',
  standalone: true,
  imports: [ReactiveFormsModule,CustomerFieldInputComponent,NgClass],
  templateUrl: './customer-add-component.component.html',
  styleUrl: './customer-add-component.component.css'
})
export class CustomerAddComponentComponent {
  http = inject(HttpClient)
  router = inject(Router)
  apiUrl = environment.apiURL
  dynamicForm: FormGroup = new FormGroup({});
  isModalOpen = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService){}

  openModal(){
    this.isModalOpen = true;
  }

  submitModal(){
    if(this.dynamicForm.valid){
      this.closeModal()
    }
  }

  closeModal(){
    this.isModalOpen = false;
    this.ngOnInit()
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
      const customer: Customer = this.dynamicForm.value;
      this.customerService.addCustomer(customer);
    }
  }

}
