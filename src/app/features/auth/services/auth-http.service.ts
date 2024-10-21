import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../../core/models/api-data";
import { StaffLoginPayload, LoggedInStaff } from "../models/login-item";
import { ActivateStaffAccountPayload } from "../models/activate-account";
import { StorageService } from "../../../core/services/storage.service";
import { tap } from "rxjs";

@Injectable()
export class AuthHttpService implements AuthService {
	readonly apiURL = environment.apiURL;
	readonly _http = inject(HttpClient);
	readonly _storageService = inject(StorageService);

	login(data: StaffLoginPayload) {
		return this._http
			.post<ApiResponse<LoggedInStaff>>(`${this.apiURL}/auth/login`, data)
			.pipe(tap((res) => this._storageService.storeLoggedInStaffDetails(res.data)));
	}

	activateStaffAccount(data: ActivateStaffAccountPayload) {
		return this._http.put<ApiResponse<LoggedInStaff>>(`${this.apiURL}/auth/activate`, data);
	}
}
