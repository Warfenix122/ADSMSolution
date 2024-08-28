import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginModel } from '../../Modules/login.model';
import { map, Observable } from 'rxjs';
import {AuthResponse} from '../../Modules/auth-response'
import { HttpClient } from '@angular/common/http';

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
        if(response.token){
          localStorage.setItem(this.tokenKey,response.token);
        }
        return response;
      })
    )
  }
}
