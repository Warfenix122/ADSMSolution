import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginModel } from '../../Modules/login.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import {AuthResponse} from '../../Modules/auth-response'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  apiUrl: string = environment.apiURL;
  private tokenKey = 'token';

  constructor() { }

  login(data:LoginModel):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/Login`,data).pipe(
      map((response)=>{
        if(response.token.length>1){
          localStorage.setItem(this.tokenKey,response.token);
        }
        return response;
      }),
      catchError(error=> this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse){
    console.error('An error occurred: ',error.message);

    let errorMessage = 'An unexpected error ocurred';
    if(error.status === 400){
      errorMessage = 'Please provide an username and a password'
    }else if (error.status === 401){
      errorMessage = 'Invalid Username or Password.';
    } else if(error.status === 0){
      errorMessage = 'No Internet connection or server is unavailable.';
    }

    return throwError(() => new Error(errorMessage));
  }

  isLoggedIn(){
    return !!localStorage.getItem(this.tokenKey)

  }

  logOut(){
    if(this.isLoggedIn()){
      localStorage.removeItem(this.tokenKey)
      return "Logged out successfully"
    }else{
      return "User is not currently logged in"
    }
  }
}
