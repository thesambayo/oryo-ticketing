import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-data';
import { StaffLoginPayload, LoggedInStaff } from '../models/login-item';
import { ActivateStaffAccountPayload } from '../models/activate-account';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
	abstract login(data: StaffLoginPayload): Observable<ApiResponse<LoggedInStaff>>;
	abstract activateStaffAccount(data: ActivateStaffAccountPayload): Observable<ApiResponse<LoggedInStaff>>;
}
