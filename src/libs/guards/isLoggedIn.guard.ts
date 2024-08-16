import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isFuture } from 'date-fns'
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
	const _router = inject(Router);
	const loggedInStaff = inject(AuthService).getLoggedInStaff();
	// if (loggedInStaff && isFuture(loggedInStaff.authentication_token.expiry)) {
	if (loggedInStaff && loggedInStaff.authentication_token) {
		return true;
	}

	_router.navigate(['login'], { queryParams: { returnUrl: state.url }});
	// _router.navigateByUrl("/login", {queryParams: { returnUrl: state.url }});
  return false;
};
