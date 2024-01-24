import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dietfactor-consult-food-modal',
  standalone: true,
  templateUrl: './consult-food-modal.component.html',
  styleUrl: './consult-food-modal.component.scss',
})
export class ConsultFoodModalComponent {
  constructor(public modalRef: MatDialogRef<ConsultFoodModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Food) {}

  closeModal(): void {
    this.modalRef.close();
  }
}

interface Food {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}