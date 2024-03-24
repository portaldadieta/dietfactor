import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '@dietfactor/modules/auth';

const MATERIAL_MODULES = [MatIconModule, MatButtonModule]
@Component({
  selector: 'dietfactor-navbar',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  
  constructor(private authService: AuthService) {}


  imgUser=`https://dietfactor.ngrok.app/users/photos/${this.authService.getUserAuthData().user.id}.jpeg`;
  navBarButtons = [
    {
      title: 'home',
      router: '/home',
      icon: 'home'
    },
    {
      title: 'minhas dietas',
      router: '/consult-diets',
      icon: 'fastfood'
    },
    {
      title: 'planejar uma dieta',
      router: '/plan-diet',
      icon: 'build'
    },
    {
      title: 'consultar alimentos',
      router: '/consult-food',
      icon: 'search'
    },
    {
      title: 'editar perfil',
      router: '/edit-profile',
      icon: 'settings'
    },

  ]
  router: Router = inject(Router);

  redirectTo(path: string): void {
    this.router.navigate([path]);
  };

  handleLogout(): void {
    this.authService.clearUserDataAndToken();
    this.redirectTo('/auth');
  };

}
