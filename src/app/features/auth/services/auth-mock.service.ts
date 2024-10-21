import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../../core/models/api-data";
import { StorageService } from "../../../core/services/storage.service";
import { StaffLoginPayload, LoggedInStaff } from "../models/login-item";
import { ActivateStaffAccountPayload } from "../models/activate-account";
import { mockResponse } from "../../../shared/utility/mock-response";
import { loginItem1 } from "./mocks/login-item";

@Injectable()
export class AuthMockService implements AuthService {
	readonly apiURL = environment.apiURL;
	readonly _http = inject(HttpClient);
	readonly _storageService = inject(StorageService);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	login(_data: StaffLoginPayload) {
		return mockResponse<ApiResponse<LoggedInStaff>>(() => {
			this._storageService.storeLoggedInStaffDetails(loginItem1.data);
			return loginItem1;
		}, 300);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	activateStaffAccount(_data: ActivateStaffAccountPayload) {
		return mockResponse<ApiResponse<LoggedInStaff>>(() => {
			return loginItem1;
		}, 300);
	}
}
