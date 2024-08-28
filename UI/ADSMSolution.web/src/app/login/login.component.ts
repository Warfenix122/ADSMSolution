import { Component, inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router)
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
    console.log(this.loginFG.value)
    this.authService.login(this.loginFG.value).subscribe((response)=>{
      console.log(response)
      this.router.navigate(['/customer-grid'])
    })
  }
}
