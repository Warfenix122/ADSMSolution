import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {CustomerGridListComponent} from './customer-grid-list/customer-grid-list.component'

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'customer-grid', component: CustomerGridListComponent },
    {path: '', redirectTo:'/login', pathMatch:'full'}
];
