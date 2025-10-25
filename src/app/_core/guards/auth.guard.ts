import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Check if the user is logged in, and if is not, redirect to the main page
 * @returns {boolean} - true if the user is logged in, false otherwise
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['']);
    return false;
  }
  return true;
};
