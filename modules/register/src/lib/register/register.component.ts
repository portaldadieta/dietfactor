import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

const MATERIAL_MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatDatepickerModule,
  MatSelectModule,
  MatButtonModule,
];

@Component({
  selector: 'dietfactor-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private AUTH_ROUTE = '/auth';
  registerForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeRegisterFormGroup();
  }

  initializeRegisterFormGroup(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      bornDate: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
      ]),
      weight: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, Validators.required),
    });
  }

  redirectToLogin() {
    this.router.navigate([`${this.AUTH_ROUTE}`]);
  }
}
