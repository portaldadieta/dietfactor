import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'dietfactor-edit-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './edit-profile.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  constructor(){
    this.initializeFormGroup();
  }
  form!: FormGroup;

  initializeFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      birthday: new FormControl(),
      height: new FormControl(),
      weigth: new FormControl(),
      gender: new FormControl(),
    })
  }
}
