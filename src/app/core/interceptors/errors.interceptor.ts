import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { toast } from "ngx-sonner";

function convertObjectToString(obj: Record<string, string>) {
	const result = [];
	// Traverse the object and concatenate the messages
	for (const [key, value] of Object.entries(obj)) {
		result.push(`${key}: ${value}`);
	}
	return result.join(", ");
}

function checkForErrorMessage(err: any, originalMessage: string): string {
	let message = "";
	if (err instanceof HttpErrorResponse) {
		const error = err.error.error;
		if (typeof error === "object") {
			message = convertObjectToString(err.error.error);
		}
		if (typeof error === "string") {
			message = err.error.error;
		}
	}

	return message.length ? message : originalMessage;
}

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
	const _router = inject(Router);
	return next(req).pipe(
		catchError((err) => {
			let errorMessage = "Error Occured";
			const errorStatus = err.status as number;

			if (errorStatus >= 400 && errorStatus < 500) {
				switch (errorStatus) {
					case 401: // unauthorized
						errorMessage = checkForErrorMessage(
							err,
							"You are unauthorized to continue, login again or report"
						);
						toast.error(errorMessage, {
							id: "session-expired",
						});
						_router.navigateByUrl("/login");
						break;
					default: // other 4xx errors
						errorMessage = checkForErrorMessage(err, "Bad request");
						toast.error(errorMessage, {
							id: "bad-request",
						});
						break;
				}
			}

			// backend errors
			if (errorStatus >= 500) {
				errorMessage = "Something went wrong, please try again or report";
				toast.error(errorMessage, {
					id: "backend-error",
				});
			}

			throw new Error(err);
		})
	);
};
