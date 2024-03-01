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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

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
    HttpClientModule,
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

  constructor(private router: Router, private http: HttpClient) {}

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

  signUp() {
    const request = {
      name: `${this.registerForm.get('name')?.value} ${
        this.registerForm.get('surname')?.value
      }`,
      email: this.registerForm.get('email')?.value,
      height: this.registerForm.get('height')?.value / 100,
      weight: this.registerForm.get('weight')?.value,
      birthday: this.registerForm.get('bornDate')?.value,
      password: this.registerForm.get('password')?.value,
    };

    console.log('clicou');

    console.log(request);

    this.http
      .post('http://localhost:3000/users', request)
      .pipe(
        tap((data) => {
          console.log('Cadastrado:', data);
        }),
        catchError((error) => {
          console.error(`Ocorreu um erro: ${error}`);

          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }

  redirectToLogin() {
    this.router.navigate([`${this.AUTH_ROUTE}`]);
  }
}
