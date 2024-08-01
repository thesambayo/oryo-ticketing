import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { toast } from 'ngx-sonner';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
	const _router = inject(Router);
	return next(req).pipe(
		catchError((err) => {
			const errorStatus = err.status as number;

			if (errorStatus >= 400 && errorStatus < 500) {
				// unauthorized
				if (errorStatus === 401) {
					toast.error("You are unauthorized to continue, login again or report", {
						id: "session-expired"
					})
					_router.navigateByUrl("/login");
				}

				// other 4xx errors
				toast.error("Your session has expired, please login again", {
					id: "session-expired"
				})
			}

			// backend errors
			if (errorStatus >= 500) {
				toast.error("Something went wrong, please try again or report", {
					id: "backend-error"
				})
			}

			throw new Error(err);
		})
	);
};
