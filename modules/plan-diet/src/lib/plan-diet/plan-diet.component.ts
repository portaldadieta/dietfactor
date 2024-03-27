import { Component, OnDestroy, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FoodAmountModalComponent } from './components/food-amout-modal/food-amount-modal.component';
import { AlertMessageModalComponent } from './components/alert-message-modal/alert-message-modal.component'
import { Subscription, finalize, forkJoin, map, switchMap, take } from 'rxjs';
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
import { AuthService } from '@dietfactor/modules/auth';
import { INutricionalValues } from './interfaces/INutricionalValues';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatCardModule,
  MatTooltipModule
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
export class PlanDietComponent implements OnInit, OnDestroy {
  dietPlanForm!: FormGroup;
  allFoods!: Food[];
  filteredFoods!: Food[];
  lunchSelectedFoods: Food[] = [];
  dinnerSelectedFoods: Food[] = [];
  snackSelectedFoods: Food[] = [];
  breakfastSelectedFoods: Food[] = [];
  subscription!: Subscription | undefined;

  breakfastNutricionalValues: INutricionalValues = {
    carbs: 0,
    fat: 0,
    kcal: 0,
    protein: 0,
  };
  snackNutricionalValues: INutricionalValues = {
    carbs: 0,
    fat: 0,
    kcal: 0,
    protein: 0,
  };
  luchNutricionalValues: INutricionalValues = {
    carbs: 0,
    fat: 0,
    kcal: 0,
    protein: 0,
  };
  dinnerNutricionalValues: INutricionalValues = {
    carbs: 0,
    fat: 0,
    kcal: 0,
    protein: 0,
  };

  totalKcal: number = 0;
  totalProtein: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;
  tracker: number = 0;

  kcalGoal: number = 2200;
  proteinGoal: number = 160;
  fatsGoal: number = 70;
  carbsGoal: number = 150;
  test: number = 0;


  dietTracker = signal(
    [this.breakfastSelectedFoods, this.snackSelectedFoods, this.lunchSelectedFoods, this.dinnerSelectedFoods]
  );

  feedbackMessage = signal('');

  private authService: AuthService = inject(AuthService);
  private dialog: MatDialog = inject(MatDialog);
  private planDietService: PlanDietService = inject(PlanDietService);

  resetNutricionalValues = (meal: INutricionalValues) => {
    meal.carbs = 0;
    meal.fat = 0;
    meal.kcal = 0;
    meal.protein = 0;
  }

  calculateNutricionalValues = (mealPlan: Food[], meal: INutricionalValues) => {
    this.resetNutricionalValues(meal);

    mealPlan.forEach(item => {
      meal.kcal += (Number(item.amount) * Number(item.kcal)) / 100;
      meal.protein += (Number(item.amount) * Number(item.protein)) / 100;
      meal.carbs += (Number(item.amount) * Number(item.carbs)) / 100;
      meal.fat += (Number(item.amount) * Number(item.fats)) / 100;
    })
  }


  constructor() {
    effect(() => {
      this.totalKcal = 0;
      this.totalProtein = 0;
      this.totalCarbs = 0;
      this.totalFat = 0;
      this.dietTracker().forEach(mealPlan => {
        mealPlan.forEach(meal => {
          this.totalKcal += (Number(meal.amount) * Number(meal.kcal)) / 100;
          this.totalProtein += (Number(meal.amount) * Number(meal.protein)) / 100
          this.totalCarbs += (Number(meal.amount) * Number(meal.carbs)) / 100
          this.totalFat += (Number(meal.amount) * Number(meal.fats)) / 100
        });
      });
      this.calculateNutricionalValues(this.breakfastSelectedFoods, this.breakfastNutricionalValues);

      this.calculateNutricionalValues(this.snackSelectedFoods, this.snackNutricionalValues);

      this.calculateNutricionalValues(this.lunchSelectedFoods, this.luchNutricionalValues);

      this.calculateNutricionalValues(this.dinnerSelectedFoods, this.dinnerNutricionalValues);

      this.handleFeedbackMessage();
      console.log(this.totalKcal)
      }, {
        allowSignalWrites: true
      }
    );
  }

  ngOnInit(): void {
    this.initializeAllFoodsData();
    this.initializeDietPlanForm();
    this.myFoodsFiltered();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleUpdateDietValues(): void {
    this.dietTracker.update(currentValue => [...currentValue]);
    this.tracker = 1;
  }

  handleFeedbackMessage(): void {
      if(this.tracker) {
        this.handleCheckIfDietIsOk();
        if(this.feedbackMessage()) {
        this.handleOpenAlertModal();  
      }
      }
  }

  initializeDietPlanForm(): void {
    this.dietPlanForm = new FormGroup({
      dietName: new FormControl('', Validators.required),
      valueObjective: new FormControl('', [Validators.pattern(/^\d*$/), Validators.required]),
      foodName: new FormControl(null),
      dietGoal: new FormControl(null, Validators.required),
      activityFactor: new FormControl(null, Validators.required),
    });
  }

  initializeAllFoodsData(): void {
    this.planDietService
      .getAllFoods()
      .pipe(
        map(foods => {
          return foods.map(food => {
            return {
              ...food,
              amount: 100
            } 
          })
        }),
        finalize(() => {
        this.filteredFoods = [...this.allFoods];
        console.log(this.filteredFoods);
      }))
      .subscribe((res) => {
        console.log(res)
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
      this.handleUpdateDietValues();  
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
    
    foodAmountDialog.componentInstance.foodAmountValue = Number(food?.amount);

    foodAmountDialog.afterClosed().subscribe((foodAmount) => {
      if(foodAmount === undefined) {
        return;
      }
      const index: number = selectedFoods.findIndex(
        (f) => f.name === food.name
      );
      selectedFoods[index] = {
        ...selectedFoods[index],
        amount: foodAmount,
      };
      
      this.handleUpdateDietValues();
    });
  }

  handleOpenAlertModal(): void {
    if(this.feedbackMessage) {
    const alertModal = this.dialog.open(AlertMessageModalComponent, {
      width: '470px',
      height: '160px',
      position: {
        'bottom': '30px'
      }});

    const messages: {
      [key: string]: string
    } = {
      lowProtein: 'É necessário que você inclua mais proteína no seu plano alimentar',
      lowFat: 'É necessário que você inclua mais proteína no seu plano alimentar',
      lowCarbs: 'É necessário que você inclua mais carboidrato no seu plano alimentar',
      highProtein: 'É necessário que você diminua a quantidade de proteína do seu plano alimentar',
      highFat: 'É necessário que você diminua a quantidade de proteína do seu plano alimentar',
      highCarb: 'É necessário que você diminua a quantidade de carboidrato do seu plano alimentar',
      excedentKcals: 'É necessário que você diminua a quantidade de calorias',
      insufficientKcals: 'É necessário que você inclua mais calorias'
    }

      alertModal.componentInstance.icon = 'warning';
      alertModal.componentInstance.feedbackMessage = messages[this.feedbackMessage()];
    } 
  }

  handleCheckIfDietIsOk(): void { 
    if(this.totalKcal < this.kcalGoal - 150) {
       this.feedbackMessage.set('insufficientKcals');

    } else if(this.totalKcal > this.kcalGoal + 150) {
      this.feedbackMessage.set('excedentKcals');
    } else if(this.totalProtein > this.proteinGoal + 10) {
      this.feedbackMessage.set('highProtein');
    } else if(this.totalProtein < this.proteinGoal - 10) {
      this.feedbackMessage.set('lowProtein');
    } else if(this.totalCarbs > this.carbsGoal + 10) {
      this.feedbackMessage.set('highCarbs');
    } else if(this.totalCarbs < this.carbsGoal - 10) {
      this.feedbackMessage.set('lowCarbs');
    } else if(this.totalFat > this.fatsGoal + 10) {
      this.feedbackMessage.set('highFat');
    } else if(this.totalFat < this.fatsGoal - 10) {
      this.feedbackMessage.set('lowFat');
    } else {
      this.feedbackMessage.set('');
    } 
  }

  createDiet(): void {
    const { dietName, dietGoal, activityFactor, valueObjective } = this.dietPlanForm.value;
    const dietData = {
      title: dietName,
      objective: dietGoal,
      factor: activityFactor,
      intensity: activityFactor,
      valueObjective,
      userId: this.authService.getUserAuthData().user.id,
      meals: [
        {
          title: 'Café da manhã',
          foods: this.breakfastSelectedFoods
        },
        {
          title: 'Lanche',
          foods: this.snackSelectedFoods
        },
        {
          title: 'Almoço',
          foods: this.lunchSelectedFoods
        },
        {
          title: 'Jantar',
          foods: this.dinnerSelectedFoods
        }
      ]
    }
    this.planDietService.createDiet(dietData)
      .pipe(
        take(1),
        switchMap((dieta: any) => {
          console.log(dieta)
          return forkJoin(
            [
              this.planDietService.createMeal(
                {
                  dietId: dieta.id,
                  title: 'Café da manhã',
                  foods: this.breakfastSelectedFoods
                }
              ),
              this.planDietService.createMeal(
                {
                  dietId: dieta.id,
                  title: 'Almoço',
                  foods: this.lunchSelectedFoods
                }
              ),
              this.planDietService.createMeal(
                {
                  dietId: dieta.id,
                  title: 'Jantar',
                  foods: this.dinnerSelectedFoods
                }
              ),
              this.planDietService.createMeal(
                {
                  dietId: dieta.id,
                  title: 'Lanche',
                  foods: this.snackSelectedFoods
                }
              )
            ]
        )}
        )
    )
    .subscribe({
          next: () => {
            this.dietPlanForm.reset();
            this.breakfastSelectedFoods = [];
            this.snackSelectedFoods = [];
            this.lunchSelectedFoods = [];
            this.dinnerSelectedFoods = [];

            // TODO: Adicionar mensagem de sucesso ao criar dieta
          }
        })
  }
}

interface Food {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  amount?: number;
}