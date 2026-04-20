import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");

  // Проверяем: если токена нет, или он пустой
  if (!token || token === 'undefined') {
    alert("You need to sign in first!");
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};





