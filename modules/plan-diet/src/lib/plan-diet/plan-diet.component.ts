import { Component, OnDestroy, AfterViewInit, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FoodAmountModalComponent } from './components/food-amount-modal.component';
import { Subscription, finalize } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { PlanDietService } from '../services/plan-diet.service';

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
  MatCardModule,
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
    HttpClientModule,
    ...MATERIAL_MODULES,
  ],
  providers: [MatDialog, PlanDietService],
  templateUrl: './plan-diet.component.html',
  styleUrl: './plan-diet.component.scss',
})
export class PlanDietComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('alertMessage') alertMessage!: ElementRef;
  dietPlanForm!: FormGroup;
  allFoods!: Food[];
  filteredFoods!: Food[];
  lunchSelectedFoods: Food[] = [];
  dinnerSelectedFoods: Food[] = [];
  snackSelectedFoods: Food[] = [];
  breakfastSelectedFoods: Food[] = [];
  subscription!: Subscription | undefined;
  totalKcal: number = 2000;
  totalProtein: number = 160;

  constructor(private dialog: MatDialog, private renderer: Renderer2, private planDietService: PlanDietService) {}

  ngOnInit(): void {
    this.initializeAllFoodsData();
    this.initializeDietPlanForm();
    this.myFoodsFiltered();
    this.handleOpenalertMessage();
  }

  ngAfterViewInit() {
    this.handleOpenalertMessage();
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

  initializeAllFoodsData(): void {
    this.planDietService
          .getAllFoods()
          .pipe(finalize(() => { 
            this.filteredFoods = [...this.allFoods];
            console.log(this.filteredFoods);
          }))
          .subscribe(res => {
             this.allFoods = res;
          });
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
    const index: number = event.container.data.findIndex(
      (food) =>
        food.name === event.previousContainer.data[event.previousIndex].name
    );

    if (index !== -1 && event.container.id === 'possibleFoods') {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (index !== -1) {
      return;
    }

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

  openFoodAmountModal(food: Food, selectedFoods: Food[]): void {
    const foodAmountDialog = this.dialog.open(FoodAmountModalComponent, {
      width: '400px',
      height: '300px',
      data: food,
    });
    foodAmountDialog.afterClosed().subscribe((foodAmount) => {
      if (foodAmount === undefined) {
        return;
      }
      const index: number = selectedFoods.findIndex(
        (f) => f.name === food.name
      );
      selectedFoods[index] = {
        ...selectedFoods[index],
        amount: foodAmount,
      };
    });
  }

  handleOpenalertMessage(): void {
    if(this.totalKcal < 2100) {
      setTimeout(() => {
        this.renderer.addClass(this.alertMessage.nativeElement, 'open');
      }, 3000);
      setTimeout(() => { 
        this.renderer.addClass(this.alertMessage.nativeElement, 'close');
     }, 7000);
     setTimeout(() => { 
      this.renderer.removeClass(this.alertMessage.nativeElement, 'open')
   }, 11000);
    } 
  }
}

interface Food {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  amount?: string;
}