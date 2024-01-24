import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
const MATERIAL_MODULES = [MatIconModule, MatButtonModule]
@Component({
  selector: 'dietfactor-navbar',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  router = inject(Router);

  redirectToAuth(): void {
    this.router.navigateByUrl('/auth')
  }
  redirectTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
