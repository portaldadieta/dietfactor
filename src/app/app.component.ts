import { RouteService } from './../../modules/shared/services/route/route.service';
import { Component, effect, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@dietfactor/modules/navbar';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent],
  providers: [RouteService],
  selector: 'dietfactor-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dietfactor';
  actualRoute: string = '';
  routeService: RouteService = inject(RouteService);

  showNavBar: boolean = false;
  constructor() {
    effect(() => {
      this.actualRoute = this.routeService.returnsActualRoute();
      this.hiddenNavBar();
    });
  }
  hiddenNavBar(): void {
    if (
      this.actualRoute === RouteService.AUTH_ROUTE ||
      this.actualRoute === RouteService.REGISTER_ROUTE
    )
      this.showNavBar = false;
    else this.showNavBar = true;
  }
}
