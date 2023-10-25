import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CryptService } from 'src/app/services/crypt.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { Login } from 'src/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  log: Login = {
    email: '',
    password: '',
    rememberMe: false,
  };
  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private regService: RegisterServiceService,
    private router:Router,
    private authService:AuthService,
    private cryptService : CryptService
  ) {
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }
  validateRegisterModel() {
    this.log.email = this.userForm.value.email;
    this.log.password = this.userForm.value.password;
    this.log.rememberMe = this.userForm.value.rememberMe;
  }
  Login() {
    this.validateRegisterModel();
    this.loginService.PostLogin(this.log).subscribe({
      next: (employee) => {
        const rem = this.userForm.value.rememberMe;
        const email = this.userForm.value.email;
        this.authService.installStorage(rem,email);
        this.router.navigateByUrl('home').then(x=>window.location.reload());
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
