import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { UiComponent } from '@dietfactor/modules/shared/ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultFoodModalComponent } from './components/consult-food-modal.component';

@Component({
  selector: 'dietfactor-consult-food',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent, 
    UiComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './consult-food.component.html',
  styleUrl: './consult-food.component.scss',
})
export class ConsultFoodComponent implements OnInit {
  constructor (private dialog: MatDialog) {};

  foodSearchForm!: FormGroup;
  filteredFoods!: Food[];
  filterName!: string;
  allFoods!: Food[];

  ngOnInit(): void {
    this.initializeFoodSearchForm();
    this.initializeStaticData();
    this.myFoodsFiltered();
  }

  initializeFoodSearchForm(): void {
    this.foodSearchForm = new FormGroup({
      foodName: new FormControl(null),
    });
  }

  initializeStaticData(): void {
    this.allFoods = [
      {
        name: "Maçã",
        kcal: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2
      },
      {
        name: "Frango grelhado",
        kcal: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
      },
      {
        name: "Arroz integral",
        kcal: 218,
        protein: 5,
        carbs: 45,
        fat: 1.6
      },
      {
        name: "Espinafre cozido",
        kcal: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.3
      },
      {
        name: "Aveia em flocos",
        kcal: 68,
        protein: 2.4,
        carbs: 12,
        fat: 1.4
      },
      {
        name: "Cenoura crua",
        kcal: 41,
        protein: 0.9,
        carbs: 10,
        fat: 0.2
      },
      {
        name: "Iogurte grego",
        kcal: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4
      }
    ];

    this.filteredFoods = [...this.allFoods];
  }

  myFoodsFilter(name: string): void {
    if (!name) {
      this.filteredFoods = [...this.allFoods];
    }

    const searchName = name.toLowerCase();

    this.filteredFoods = this.allFoods.filter((food) => {
      return food.name.toLowerCase().includes(searchName);
    });
  }

  myFoodsFiltered(): void {
    this.foodSearchForm
      .get('foodName')
      ?.valueChanges.subscribe((name) => this.myFoodsFilter(name));
  }

  openDialog(food: Food): void {
    this.dialog.open(ConsultFoodModalComponent, {
      width: '380px',
      height: '400px',
      data: food
    })
  }
}

interface Food {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}
