import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
const MATERIAL_MODULES = [MatIconModule, MatButtonModule]
@Component({
  selector: 'dietfactor-navbar',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
