import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../core/services/storage.service';

const skippedURLs = [
	"auth/login",
	"auth/activate",
	"/tickets/"
];

// Function to check if the request URL contains any of the skipped URLs
function shouldSkip(requestURL: string) {
	// Check if any skipped URL is a substring of the request URL
	return skippedURLs.some(skipURL => requestURL.includes(skipURL));
}


export const authInterceptor: HttpInterceptorFn = (req, next) => {
	if (shouldSkip(req.url)) {
		return next(req);
	}

	const loggedInStaff = inject(StorageService).getLoggedInStaff();
	const authToken = loggedInStaff?.authentication_token ?? "";

	const clonedReq = req.clone({
		setHeaders: {
			Authorization: `Bearer ${authToken}`,
		}
	});
	return next(clonedReq);
};
