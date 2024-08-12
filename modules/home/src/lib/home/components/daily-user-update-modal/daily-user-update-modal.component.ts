import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { UserInfo } from '@dietfactor/modules/edit-profile';
import { EditProfileService } from '@dietfactor/modules/edit-profile';
import { finalize } from 'rxjs';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];

interface User {
  weight: string;
}

@Component({
  selector: 'dietfactor-daily-user-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...MATERIAL_MODULES],
  templateUrl: './daily-user-update-modal.component.html',
  styleUrl: './daily-user-update-modal.component.scss',
})
export class DailyUserUpdateModalComponent implements OnInit {
  @Input() userData!: UserInfo;
  @Output() updatedUserWeight = new EventEmitter<number>();

  userInfoForm!: FormGroup;

  public dailyModal: MatDialogRef<DailyUserUpdateModalComponent> = inject(MatDialogRef);
  public userInfo: User = inject(MAT_DIALOG_DATA);
  private editProfileService: EditProfileService = inject(EditProfileService);

  ngOnInit(): void {
    this.initializeUserInfoForm();
  }

  initializeUserInfoForm(): void {

    this.userInfoForm = new FormGroup({
      oldWeight: new FormControl({ disabled: true, value: null }, [
      ]),
      newWeight: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(Number(this.userData?.weight) - 20)
      ])
    })

    const { weight: oldWeight } = this.userData;

    if(oldWeight) {
      this.userInfoForm.get('oldWeight')?.setValue(`${oldWeight}kg`);  
    }
  } 

  handleSetTimeUntilNextUserUpdate(): void {
    const timeStamp = Date.now();

    if(!JSON.parse(localStorage.getItem('user-daily-update')!)) {
      localStorage.setItem('user-daily-update', JSON.stringify({
        expiresTime: timeStamp + (1000*60*24)
      }))
    }
  }

  closeDailyUpdateUserInfo(): void {
    this.dailyModal.close();
    this.handleSetTimeUntilNextUserUpdate();
  }

  handleUpdateUserInfo(): void {
    const newWeight = this.userInfoForm.value.newWeight;

    if(newWeight === null || undefined) {
        this.closeDailyUpdateUserInfo();
        this.handleSetTimeUntilNextUserUpdate();
    }

    const user = {
      ...this.userData,
      weight: newWeight
    };

    this.editProfileService.updateUserProfile(user.id!, user).pipe(
      finalize(() => {
        this.handleUpdateUserLocalStorage(user);
        this.updatedUserWeight.emit(1);
      })
    ).subscribe()
    this.closeDailyUpdateUserInfo();
  }

  handleUpdateUserLocalStorage(userData: any): void {
    const currentValues = JSON.parse(localStorage.getItem('user-data')!);

    const updatedValues = {
      ...currentValues,
      ...userData
    } 

    localStorage.setItem('user-data', JSON.stringify(updatedValues));
  }
}
