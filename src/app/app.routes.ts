import { Route } from '@angular/router';
import { AuthGuard } from '../../modules/auth/src/lib/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@dietfactor/modules/home').then((c) => c.HomeComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@dietfactor/modules/auth').then((c) => c.AuthComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@dietfactor/modules/register').then((c) => c.RegisterComponent),
  },
  {
    path: 'consult-food',
    loadComponent: () =>
      import('@dietfactor/modules/consult-food').then(
        (c) => c.ConsultFoodComponent
      ),
  },
  {
    path: 'consult-diets',
    loadComponent: () =>
      import('@dietfactor/modules/consult-diets').then(
        (c) => c.ConsultDietsComponent
      ),
  },
  {
    path: 'plan-diet',
    loadComponent: () =>
      import('@dietfactor/modules/plan-diet').then((c) => c.PlanDietComponent),
  },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('@dietfactor/modules/edit-profile').then(
        (c) => c.EditProfileComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
