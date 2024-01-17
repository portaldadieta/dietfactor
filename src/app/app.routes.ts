import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: ()=>import('@dietfactor/modules/home').then((c)=>c.HomeComponent)
    },
    {
        path: 'auth',
        loadComponent: ()=>import('@dietfactor/modules/auth').then((c)=>c.AuthComponent)
    },
    {
        path: 'register',
        loadComponent: ()=>import('@dietfactor/modules/register').then((c)=>c.RegisterComponent)
    },
    {
        path: 'consult-food',
        loadComponent: ()=>import('@dietfactor/modules/consult-food').then((c)=>c.ConsultFoodComponent)
    },
    {
        path: 'consult-diets',
        loadComponent: ()=>import('@dietfactor/modules/consult-diets').then((c)=>c.ConsultDietsComponent)
    },
    {
        path: 'plan-diet',
        loadComponent: ()=>import('@dietfactor/modules/plan-diet').then((c)=>c.PlanDietComponent)
    },
    {
        path: "**",
        redirectTo: ""
    }
];
