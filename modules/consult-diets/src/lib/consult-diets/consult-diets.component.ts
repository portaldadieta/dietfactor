import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UiComponent } from '@dietfactor/modules/shared/ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import { ConsultDietsModalComponent } from './components/consult-diets-modal.component';
import { Subscription } from 'rxjs';
import { Diet } from '../interfaces/diet.interface';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
];

@Component({
  selector: 'dietfactor-consult-diets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    ConsultDietsModalComponent,
    UiComponent,
    ...MATERIAL_MODULES,
  ],
  providers: [MatDialog],
  templateUrl: './consult-diets.component.html',
  styleUrl: './consult-diets.component.scss',
})
export class ConsultDietsComponent implements OnInit, OnDestroy {
  dietSearchForm!: FormGroup;
  allDiets!: Diet[];
  filteredDiets!: Diet[];
  filterName!: string;
  subscription!: Subscription | undefined;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeDietSearchForm();
    this.initializeStaticData();
    this.myDietsFiltered();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initializeDietSearchForm(): void {
    this.dietSearchForm = new FormGroup({
      dietName: new FormControl(null),
    });
  }

  initializeStaticData(): void {
    this.allDiets = [
      {
        name: 'Dieta do Monstro',
        goal: 'Bulking',
        kcal: 2600,
        protein: 140,
        carbs: 250,
        fat: 100,
      },
      {
        name: 'Dieta do Burguer King',
        goal: 'Bulking',
        kcal: 2600,
        protein: 140,
        carbs: 250,
        fat: 100,
      },
      {
        name: 'Dieta do Espartano',
        goal: 'Bulking',
        kcal: 2200,
        protein: 140,
        carbs: 200,
        fat: 80,
      },
      {
        name: 'Dieta do MC Donalds',
        goal: 'Bulking',
        kcal: 2340,
        protein: 140,
        carbs: 200,
        fat: 90,
      },
      {
        name: 'Dieta do Monstro',
        goal: 'Bulking',
        kcal: 2600,
        protein: 140,
        carbs: 250,
        fat: 100,
      },
      {
        name: 'Dieta do Monstro',
        goal: 'Bulking',
        kcal: 2600,
        protein: 140,
        carbs: 250,
        fat: 100,
      },
      {
        name: 'Dieta do Monstro',
        goal: 'Bulking',
        kcal: 2600,
        protein: 140,
        carbs: 250,
        fat: 100,
      },
      {
        name: 'Dieta do Monstro',
        goal: 'Bulking',
        kcal: 2600,
        protein: 140,
        carbs: 250,
        fat: 100,
      },
    ];
    this.filteredDiets = [...this.allDiets];
  }

  myDietsFilter(name: string): void {
    if (!name) {
      this.filteredDiets = [...this.allDiets];
    }

    const searchName = name.toLowerCase();

    this.filteredDiets = this.allDiets.filter((diet) => {
      return diet.name.toLowerCase().includes(searchName);
    });
  }

  myDietsFiltered(): void {
    this.subscription = this.dietSearchForm
      .get('dietName')
      ?.valueChanges.subscribe((name) => this.myDietsFilter(name));
  }

  openDietInfoModal(dietInfo: Diet): void {
    this.dialog.open(ConsultDietsModalComponent, {
      width: '1256px',
      height: '380px',
      data: dietInfo,
    });
  }
}
