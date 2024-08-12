import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
<<<<<<< HEAD
const MATERIAL_MODULES = [MatIconModule, MatButtonModule]
=======
import { AuthService } from '@dietfactor/modules/auth';
import { Constants } from '@dietfactor/modules/auth';

const MATERIAL_MODULES = [MatIconModule, MatButtonModule, ]
>>>>>>> a7f11186924e628681c923a7e828f76414e1b54f
@Component({
  selector: 'dietfactor-navbar',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
<<<<<<< HEAD
  router = inject(Router);

  redirectToAuth(): void {
    this.router.navigateByUrl('/auth')
  }
  redirectTo(path: string): void {
    this.router.navigateByUrl(path);
  }
=======
  
  constructor(private authService: AuthService) {}
  
  userData = this.authService.getUserAuthData().user;


  imgUser = `${Constants.API_URL}/users/photos/${this.authService.getUserAuthData().user.id}.jpeg` || null;

  expand = false;

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

  expandNavbar(): void {
    this.expand = !this.expand;
  }

>>>>>>> a7f11186924e628681c923a7e828f76414e1b54f
}
