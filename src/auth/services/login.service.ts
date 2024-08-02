import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../libs/models/model';
import { environment } from '../../environments/environment';
import { AuthService } from '../../libs/services/auth.service';
import { LoggedInStaff, StaffLoginPayload } from '../model/login-item';

interface ActivateStaffAccountPayload {
	password: string;
	token: string;
}

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
		);
	}

	activateStaffAccount(data: ActivateStaffAccountPayload) {
		return this._http.put<ApiResponse<LoggedInStaff>>(`${this.apiURL}/auth/activate`, data);
	}
}
