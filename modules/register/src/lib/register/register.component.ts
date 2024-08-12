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
import { RegisterService } from '../services/register.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, finalize, switchMap, tap, throwError } from 'rxjs';
import { userInfo } from '../interfaces/user-info.interface';

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
    RegisterService,
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
  private AUTH_ROUTE = 'localhost:4200/auth';
  imageSrc: string | ArrayBuffer | null = null;
  image!: File;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

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
    const request: userInfo = {
      name: `${this.registerForm.get('name')?.value} ${
        this.registerForm.get('surname')?.value
      }`,
      email: this.registerForm.get('email')?.value,
      height: this.registerForm.get('height')?.value / 100,
      weight: this.registerForm.get('weight')?.value,
      birthday: this.registerForm.get('bornDate')?.value,
      sex: this.registerForm.get('gender')?.value,
      password: this.registerForm.get('password')?.value,
    };

    console.log('clicou');
    console.log(request);

    this.registerService
      .createUser(request)
      .pipe(
        switchMap((response: any)=> this.registerService.uploadImageUser(this.image, response.id)),
        finalize(() => this.redirectToLogin()),
        catchError((error) => {
          console.log(`Ocorreu um erro: ${error}`);
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }

  redirectToLogin() {
    this.router.navigate([`${this.AUTH_ROUTE}`]);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.image = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
