import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../../Modules/Customer.model';
import { AsyncPipe } from '@angular/common';
import { CustomerDisplayComponent } from "../customer-display/customer-display.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NavBarComponent} from '../nav-bar/nav-bar.component'
import { CustomerAddComponentComponent } from "../customer-add-component/customer-add-component.component";
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-grid-list',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CustomerDisplayComponent, FormsModule, ReactiveFormsModule, NavBarComponent, CustomerAddComponentComponent],
  templateUrl: './customer-grid-list.component.html',
  styleUrl: './customer-grid-list.component.css'
})

export class CustomerGridListComponent {
  http = inject(HttpClient)
  customers: Customer[] = []

  constructor (private customerService: CustomerService){}

  ngOnInit(){
    this.customerService.customers$.subscribe(data => {
      this.customers = data
    })
  }

  private getCustomers(): Observable<Customer[]>{
    const retrievedToken =  localStorage.getItem("token")
    const authHeader = new HttpHeaders().set('Authorization',`Bearer ${retrievedToken}`)
    return this.http.get<Customer[]>('https://localhost:7272/api/Customer',{
      headers: authHeader.set('Authorization',`Bearer ${retrievedToken}`)
    });
  }
}

