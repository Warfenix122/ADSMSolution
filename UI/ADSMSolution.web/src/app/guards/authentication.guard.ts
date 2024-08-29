import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, Inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  //Inject the AuthService and the Router
  const authservice = inject(AuthService);
  const router = inject(Router);

  //verify if the user is logged in using the AuthService
  if(authservice.isLoggedIn()){
    return true; //allow access to the route
  }else{
    router.navigate(['/login']); //redirect to the login page
    return false; //Prevent the navigation to the route
  }
};
