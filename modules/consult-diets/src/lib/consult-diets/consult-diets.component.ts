import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from '@dietfactor/modules/shared/ui';

@Component({
  selector: 'dietfactor-consult-diets',
  standalone: true,
  imports: [CommonModule, UiComponent],
  templateUrl: './consult-diets.component.html',
  styleUrl: './consult-diets.component.scss',
})
export class ConsultDietsComponent {}
