import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dietfactor-consult-food-modal',
  standalone: true,
  imports: [
    MatIconModule,
  ],
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
  fats: number;
}