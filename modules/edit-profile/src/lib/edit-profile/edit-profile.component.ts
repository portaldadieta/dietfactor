import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditProfileService } from '../services/edit-profile.service';
import { UserInfo } from '../edit-profile/interfaces/user.interface';
import { finalize, catchError, throwError } from 'rxjs';

@Component({
  selector: 'dietfactor-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './edit-profile.component.html',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    EditProfileService
  ],
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  constructor(private editProfileService: EditProfileService) {
    this.initializeFormGroup();
  }
 editProfileForm!: FormGroup;

  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  initializeFormGroup(): void {
    this.editProfileForm = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      birthday: new FormControl(),
      height: new FormControl(),
      weigth: new FormControl(),
      gender: new FormControl(),
    });
  }

  editProfile(): void {
    const userData: UserInfo = {
      id: 1,
      name: `${this.editProfileForm.get('name')?.value} ${
        this.editProfileForm.get('surname')?.value
      }`,
      email: this.editProfileForm.get('email')?.value,
      height: this.editProfileForm.get('height')?.value / 100,
      weight: this.editProfileForm.get('weight')?.value,
      birthday: this.editProfileForm.get('bornDate')?.value,
      password: this.editProfileForm.get('password')?.value,
    };

    this.editProfileService.updateUserProfile(1, userData)
    .pipe(
      finalize(() => console.log('Perfil Editado')),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    ).subscribe();
  }
}
