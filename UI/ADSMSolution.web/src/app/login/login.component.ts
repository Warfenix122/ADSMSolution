import { Component, inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage = '';
  loginFG: FormGroup = new FormGroup({
    Username: new FormControl<string>(''),
    Password: new FormControl<string>('')
  })

  constructor(private fb: FormBuilder){}

  ngOnInit(): void{
    this.loginFG = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  login(){
    this.authService.login(this.loginFG.value).pipe(
      catchError(error =>{
        this.errorMessage = error.message
        return of() //return an empty observable to complete the stream
      })
    ).subscribe({
      next: response =>{
        if (this.authService.isLoggedIn()){
          this.router.navigate(['/customer-grid'])
        }else {
          alert('Unexpected response from the server')
        }
      }
    })
  }
}
