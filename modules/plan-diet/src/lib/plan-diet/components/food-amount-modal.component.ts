import { Component, OnInit, Inject } from '@angular/core';
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

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];

@Component({
  selector: 'dietfactor-food-amount-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...MATERIAL_MODULES,
  ],
  templateUrl: './food-amount-modal.component.html',
  styleUrl: './food-amount-modal.component.scss',
})
export class FoodAmountModalComponent implements OnInit {
  foodAmountForm!: FormGroup;

  constructor(
    public modal: MatDialogRef<FoodAmountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public food: Food
  ) {}

  ngOnInit(): void {
    this.initializeFoodAmountForm();
  }

  initializeFoodAmountForm(): void {
    this.foodAmountForm = new FormGroup({
      foodAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  closeFoodAmountModal(): void {
    this.modal.close();
  }

  submitFoodAmount(): void {
    this.modal.close(this.foodAmountForm.value.foodAmount);
  }

  get foodAmount() {
    return this.foodAmountForm.get('foodAmount');
  }
}

interface Food {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}