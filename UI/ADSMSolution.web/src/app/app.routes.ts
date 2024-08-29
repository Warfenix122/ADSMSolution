import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {CustomerGridListComponent} from './customer-grid-list/customer-grid-list.component'
import {authenticationGuard} from '../app/guards/authentication.guard'

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'customer-grid', component: CustomerGridListComponent, canActivate: [authenticationGuard]},
    {path: '', redirectTo:'/login', pathMatch:'full'}
];
