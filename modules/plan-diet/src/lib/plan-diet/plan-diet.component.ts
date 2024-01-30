import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dietfactor-plan-diet',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './plan-diet.component.html',
  styleUrl: './plan-diet.component.scss',
})
export class PlanDietComponent {
  dietPlanForm: FormGroup;

  constructor() {
    this.dietPlanForm = new FormGroup({
      intensity: new FormControl('', [Validators.pattern(/^\d*$/)]), // Validates for number pattern
    });
  }

  get intensity() {
    return this.dietPlanForm.get('intensity');
  }

  isNumber(value: string): boolean {
    return !isNaN(Number(value)) && isFinite(Number(value));
  }
}