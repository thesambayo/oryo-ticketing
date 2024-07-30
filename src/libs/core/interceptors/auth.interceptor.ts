import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	// const authToken = inject(AuthService).getAuthToken();
	const authToken = "PIPFM2J7SNZ2RZUXATDBW5UJLE";
  // Clone the request to add the authentication header.
  const clonedReq = req.clone({setHeaders: {
		Authorization: `Bearer ${authToken}`,
  }});
  return next(clonedReq);
};
