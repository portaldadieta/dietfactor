import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  selector: 'dietfactor-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dietfactor';
}
