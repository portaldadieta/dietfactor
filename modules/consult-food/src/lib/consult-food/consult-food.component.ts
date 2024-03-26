import { Component, OnDestroy, OnInit } from '@angular/core';
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
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ConsultFoodModalComponent } from './components/consult-food-modal.component';
import { Food } from './interfaces/food.interface';
import { ConsultFoodService } from '../services/consult-food.service';
import { HttpClientModule } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';
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
    FormsModule,
    HttpClientModule
  ],
  providers:[ConsultFoodService],
  templateUrl: './consult-food.component.html',
  styleUrl: './consult-food.component.scss',
})
export class ConsultFoodComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private consultFoodService: ConsultFoodService) {}

  foodSearchForm!: FormGroup;
  filteredFoods!: Food[];
  filterName!: string;
  allFoods!: Food[];
  subscription!: Subscription | undefined;
  
  ngOnInit(): void {
    this.initializeFoodSearchForm();
    this.initializeFoodData();
    this.myFoodsFiltered();
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  initializeFoodSearchForm(): void {
    this.foodSearchForm = new FormGroup({
      foodName: new FormControl(null),
    });
  }

  initializeFoodData(): void {
    this.consultFoodService.getFoodByAmount().pipe(
      finalize(() => {
        this.filteredFoods = [...this.allFoods]
        console.log(this.filteredFoods);
      })
    ).subscribe(
      res => {
        this.allFoods = res;
      }
    );
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
   this.subscription = this.foodSearchForm
      .get('foodName')
      ?.valueChanges.subscribe((name) => this.myFoodsFilter(name)) || undefined;
  }

  openDialog(food: Food): void {
    this.dialog.open(ConsultFoodModalComponent, {
      width: '380px',
      height: '400px',
      data: food,
    });
  }
}
