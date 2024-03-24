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
import { AuthService } from '@dietfactor/modules/auth'
import { IResponse } from '@dietfactor/modules/auth';
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
  constructor(private editProfileService: EditProfileService, private authService: AuthService) {
    this.initializeFormGroup();
    this.extractUserData();
    this.fillUserFormData();
  }

 editProfileForm!: FormGroup;
 user!: Omit<IResponse, "access_token">['user'];

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
      weight: new FormControl(),
    });
  };

  fillUserFormData(): void {
    const date = this.user?.birthday.split('T')[0];

    const formattedDate = date.split('-').reverse().join('-');

    this.editProfileForm.setValue({
      name: this.user?.name.split(' ')[0],
      email: this.user?.email,
      surname: this.user?.name.split(' ')[1],
      birthday: new Date(formattedDate),
      height: this.user?.height * 100,
      weight: this.user?.weight,
    });
  }

  extractUserData(): void {
    const { user } = this.authService.getUserAuthData();
    this.user = user;
  }
  
  handleEditProfile(): void {
    const userData: UserInfo = this.editProfileForm.getRawValue();

    this.editProfileService.updateUserProfile(userData)
    .pipe(
      finalize(() => console.log('Perfil Editado')),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    ).subscribe();
  }
}
