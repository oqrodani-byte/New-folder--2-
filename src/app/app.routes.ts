import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path : "",
    redirectTo : "home",
    pathMatch : "full"
  },
  {
    path : "home",
    
    loadComponent : () => import('./home/home').then(m => m.Home)

  },
  {
    path : "details",
    loadComponent : () => import('./details/details').then(m => m.Details),
    canActivate : [authGuard]

  },
    {
    path : "login",
    loadComponent : () => import('./login/login').then(m => m.Login)

  },
  {
    path : "**",
    loadComponent : () => import('./error/error').then(m => m.Error)

  }
];




