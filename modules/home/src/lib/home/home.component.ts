/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@dietfactor/modules/navbar';
import Chart from 'chart.js/auto';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '@dietfactor/modules/auth';
import { Constants } from '@dietfactor/modules/auth';
import { MatDialog } from '@angular/material/dialog';
import { DailyUserUpdateModalComponent } from './components/daily-user-update-modal/daily-user-update-modal.component';
import { take } from 'rxjs';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'dietfactor-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatIconModule, MatButtonModule, MatCardModule],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  homeService: HomeService = inject(HomeService);
  dialog: MatDialog = inject(MatDialog);

  imgUser=`${Constants.API_URL}/users/photos/${this.authService.getUserAuthData().user.id}.jpeg`;
  weigthChart: any = [];
  otherChart: any = [];
  difference: number = 12;
  userData!: any;

  diets: any = [];

  totalKcal: number = 0;
  totalCarbs: number = 0;
  totalProteins: number = 0;
  totalFat: number = 0;

  ngOnInit() {
    this.getUserData();
    this.calculateNutricionalValues();
    this.handleShowDailyModal();
  }

  getUserData(): void {
    const { id, name, email, height, weight, birthday, sex } = this.authService.getUserAuthData().user;

    this.userData = {
      id,
      name,
      email,
      height: `${height.toString().padEnd(4, '0')}`,
      weight,
      birthday,
      sex
    };
  };

  calculateNutricionalValues() {
    this.homeService.getNutricionalValues().subscribe(diets => {
      console.log(diets)
      diets.forEach(diet => {
        diet.meals.forEach(meal => {
          meal.foods.forEach(food => {
            this.totalCarbs += food.carbs;
            this.totalFat += food.fats;
            this.totalKcal += food.kcal;
            this.totalProteins += food.protein;
          })
        })
      })

      this.initializeCharts();
    })

  }

  initializeCharts() {
    this.weigthChart = new Chart('weigthChart', {
      type: 'line',
      data: {
        labels: ['janeiro', 'fevereiro', 'março', 'abril', 'junho', 'julho', 'agosto','setembro','outubro', 'novembro', 'dezembro'],
        datasets: [
          {
            label: 'peso (kg)',
            data: [87, 80, 79, 81, 78, 77, 77, 77, 75, 76, 78, 74],
            borderWidth: 2,
            fill: false,
            tension: 0.1        
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Essa é sua evolução',
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
    this.otherChart = new Chart('otherChart', {
      type: 'doughnut',
      data: {
        labels: ['proteinas', 'gorduras', 'calorias', 'carboidratos'],
        datasets: [
          {
            data: [this.totalProteins, this.totalFat, this.totalKcal, this.totalCarbs],
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

handleShowDailyModal(): void {
  const expiresTime = JSON.parse(localStorage.getItem('user-daily-update') || '{}').expiresTime || null;
  
  if(expiresTime <= Date.now() || expiresTime === undefined) {
    localStorage.removeItem('user-daily-update');
    this.openDailyWeightModal();
    return;
  }
}
  openDailyWeightModal(): void {
    const dailyModalDialog = this.dialog.open(DailyUserUpdateModalComponent, {
      width: '400px',
      height: '400px'
    });
    dailyModalDialog.componentInstance.userData = this.userData;
    dailyModalDialog.componentInstance.updatedUserWeight.pipe(take(1)).subscribe($e => {
      if($e) {
        this.getUserData();
      }
    })
  }


}
