import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../Modules/Customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient)
  apiUrl = environment.apiURL
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();
  private retrievedToken =  localStorage.getItem("token");
  private authHeader = new HttpHeaders().set('Authorization',`Bearer ${this.retrievedToken}`);
  constructor() { 
    this.loadCustomers()
  }

  private loadCustomers(){
    const returnedCustomers = this.http.get<Customer[]>('https://localhost:7272/api/Customer',{headers: this.authHeader}).subscribe(data => this.customersSubject.next(data));
    console.log(returnedCustomers)
  }

  addCustomer(customer: Customer) {
    console.log("Adding Customer")
    this.http.post(`${this.apiUrl}/api/Customer`, customer,{headers: this.authHeader}).subscribe({
      next: (response) => {
        console.log('Success:', response)
        this.loadCustomers() //Reload the Customer List after adding to trigger the GridList to Update
      },
      error: (error) => console.error('Error:', error)
    });
  }
}
