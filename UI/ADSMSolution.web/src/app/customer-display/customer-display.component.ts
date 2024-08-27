import { Component, Input } from '@angular/core';
import { Customer } from '../../Modules/Customer.model';

@Component({
  selector: 'app-customer-display',
  standalone: true,
  imports: [],
  templateUrl: './customer-display.component.html',
  styleUrl: './customer-display.component.css'
})
export class CustomerDisplayComponent {
  @Input({required:true}) customer: Customer |null = null;
  
}
