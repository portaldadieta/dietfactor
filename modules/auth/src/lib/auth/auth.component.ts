import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'dietfactor-auth',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private REGISTER_ROUTE = '/register';
  private DASHBOARD_ROUTE = '/';

  constructor(private router: Router) {}

  redirectToDashBoard(): void {
    this.router.navigate([`${this.DASHBOARD_ROUTE}`]);
  }

  redirectToRegister(): void {
    this.router.navigate([`${this.REGISTER_ROUTE}`]);
  }
}
