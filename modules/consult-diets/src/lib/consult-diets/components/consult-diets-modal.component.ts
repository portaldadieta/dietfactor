/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diet } from '../../interfaces/diet.interface';
import Chart from 'chart.js/auto';
const MATERIAL_MODULES = [MatFormFieldModule, MatInputModule, MatIconModule];

@Component({
  selector: 'dietfactor-consult-diets-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  templateUrl: './consult-diets-modal.component.html',
  styleUrl: './consult-diets-modal.component.scss',
})
export class ConsultDietsModalComponent implements OnInit {
  dietInformationForm!: FormGroup;
  otherChart: any = [];

  constructor(
    public modal: MatDialogRef<ConsultDietsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dietInfo: Diet
  ) {}

  ngOnInit(): void {
    this.initializeDietInformationForm();
    this.setDietInformationFormValues();
    this.otherChart = new Chart('otherChart', {
      type: 'doughnut',
      data: {
        labels: ['proteinas', 'gorduras', 'calorias', 'carboidratos'],
        datasets: [
          {
            data: [87, 80, 79, 81],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Alimentação',
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 0.5,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  initializeDietInformationForm(): void {
    this.dietInformationForm = new FormGroup({
      dietName: new FormControl({ value: null, disabled: true }),
      dietGoal: new FormControl({ value: null, disabled: true }),
      dietTotalKcal: new FormControl({ value: null, disabled: true }),
      dietProtein: new FormControl({ value: null, disabled: true }),
      dietCarbs: new FormControl({ value: null, disabled: true }),
      dietFats: new FormControl({ value: null, disabled: true }),
    });
  }

  setDietInformationFormValues(): void {
    this.dietInformationForm.patchValue({
      dietName: this.dietInfo?.name,
      dietGoal: this.dietInfo?.goal,
      dietTotalKcal: `${this.dietInfo?.kcal}kcal`,
      dietProtein: `${this.dietInfo?.protein}gr`,
      dietCarbs: `${this.dietInfo?.carbs}gr`,
      dietFats: `${this.dietInfo?.fat}gr`,
    });
  }

  closeDietInfoModal(): void {
    this.modal.close();
  }
}
