import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'dietfactor-ui',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss',
})
export class UiComponent {}
