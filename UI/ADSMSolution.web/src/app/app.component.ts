import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../Modules/Customer.model';
import { AsyncPipe } from '@angular/common';
import { CustomerDisplayComponent } from "./customer-display/customer-display.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NavBarComponent} from './nav-bar/nav-bar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CustomerDisplayComponent, FormsModule, ReactiveFormsModule,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  http = inject(HttpClient)

  contactsForm = new FormGroup({
    firstName: new FormControl<string>(''),
    middleName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
  })

  customer$ = this.getCustomers();

  private getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>('https://localhost:7272/api/Customer');
  }
}

