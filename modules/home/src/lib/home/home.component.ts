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

@Component({
  selector: 'dietfactor-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  dialog: MatDialog = inject(MatDialog);

  imgUser=`${Constants.API_URL}/users/photos/${this.authService.getUserAuthData().user.id}.jpeg`;
  weigthChart: any = [];
  otherChart: any = [];
  difference: number = 12;
  userData!: any;

  ngOnInit() {
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

    this.getUserData();
    this.handleShowDailyModal();
  }

  getUserData(): void {
    const { id, name, email, height, weight, birthday } = this.authService.getUserAuthData().user;

    this.userData = {
      id,
      name,
      email,
      height,
      weight,
      birthday
    };
  };

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
  }


}
