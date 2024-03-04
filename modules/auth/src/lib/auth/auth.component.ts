import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IAuth } from '../interfaces/IAuth.interface';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'dietfactor-auth',
  standalone: true,
  imports: [
    HttpClientModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private REGISTER_ROUTE = '/register';
  private DASHBOARD_ROUTE = '/';
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeLoginFormGroup();
  }

  redirectToDashBoard(): void {
    this.router.navigate([`${this.DASHBOARD_ROUTE}`]);
  }

  redirectToRegister(): void {
    this.router.navigate([`${this.REGISTER_ROUTE}`]);
  }

  initializeLoginFormGroup(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  handleLogin() {
    const bodyRequest: IAuth = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(bodyRequest);
  }
}
