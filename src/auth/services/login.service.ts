import { inject, Injectable } from '@angular/core';
import { LoggedInStaff, StaffLoginPayload } from '../model/login-item';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../libs/models/model';
import { catchError, tap } from 'rxjs';
import { AuthService } from '../../libs/services/auth.service';

const STAFF_STORAGE_KEY = "loggedInStaff";

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	apiURL = environment.apiURL;
	_http = inject(HttpClient);
	_authService = inject(AuthService);


	login(data: StaffLoginPayload) {
		return this._http.post<ApiResponse<LoggedInStaff>>(`${this.apiURL}/auth/login`, data).pipe(
			tap((res) => this._authService.storeLoggedInStaffDetails(res.data)),
			// map(res => res.data.employee.name)
			catchError((err) => {
				if (err instanceof HttpErrorResponse) {
					console.log(err.error.error);
				}
				throw new Error(`error occured`);
			})
		);
	}
}
