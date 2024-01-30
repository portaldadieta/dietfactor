import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { FoodAmountModalComponent } from './components/food-amount-modal.component';
import { Subscription } from 'rxjs';

import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
];

@Component({
  selector: 'dietfactor-plan-diet',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    ...MATERIAL_MODULES,
  ],
  providers: [MatDialog],
  templateUrl: './plan-diet.component.html',
  styleUrl: './plan-diet.component.scss',
})
export class PlanDietComponent implements OnInit, OnDestroy {
  dietPlanForm!: FormGroup;
  allFoods!: Food[];
  filteredFoods!: Food[];
  lunchSelectedFoods: Food[] = [];
  dinnerSelectedFoods: Food[] = [];
  snackSelectedFoods: Food[] = [];
  breakfastSelectedFoods: Food[] = [];
  subscription!: Subscription | undefined;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeStaticData();
    this.initializeDietPlanForm();
    this.myFoodsFiltered();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initializeDietPlanForm(): void {
    this.dietPlanForm = new FormGroup({
      intensity: new FormControl('', [Validators.pattern(/^\d*$/)]),
      foodName: new FormControl(null),
      dietGoal: new FormControl(null, Validators.required),
      activityFactor: new FormControl(null, Validators.required),
    });
  }

  initializeStaticData(): void {
    this.allFoods = [
      {
        name: 'Maçã',
        kcal: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
      },
      {
        name: 'Frango grelhado',
        kcal: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
      },
      {
        name: 'Arroz integral',
        kcal: 218,
        protein: 5,
        carbs: 45,
        fat: 1.6,
      },
      {
        name: 'Espinafre cozido',
        kcal: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.3,
      },
      {
        name: 'Aveia em flocos',
        kcal: 68,
        protein: 2.4,
        carbs: 12,
        fat: 1.4,
      },
      {
        name: 'Cenoura crua',
        kcal: 41,
        protein: 0.9,
        carbs: 10,
        fat: 0.2,
      },
      {
        name: 'Iogurte grego',
        kcal: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4,
      },
    ];

    this.filteredFoods = [...this.allFoods];
  }

  myFoodsFiltered(): void {
    this.dietPlanForm
      .get('foodName')
      ?.valueChanges.subscribe((name) => this.myFoodsFilter(name));
  }

  myFoodsFilter(name: string): void {
    if (!name) {
      this.filteredFoods = [...this.allFoods];
    }
    const searchName: string = name.toLowerCase();

    this.filteredFoods = this.allFoods.filter((food) => {
      return food.name.toLowerCase().includes(searchName);
    });
  }

  dropFood(event: CdkDragDrop<Food[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (event.previousContainer.id === 'possibleFoods') {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }

  get intensity() {
    return this.dietPlanForm.get('intensity');
  }

  isNumber(value: string): boolean {
    return !isNaN(Number(value)) && isFinite(Number(value));
  }

  openFoodAmountModal(food: Food): void {
    this.dialog.open(FoodAmountModalComponent, {
      width: '400px',
      height: '300px',
      data: food,
    });
  }
}

interface Food {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}
