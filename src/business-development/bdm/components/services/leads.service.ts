import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../../libs/models/model';
import { AuthService } from '../../../../libs/services/auth.service';
import { CreateUserLeadsPayload } from '../../models/bdm-item';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
	apiURL = environment.apiURL;
	_http = inject(HttpClient);
  _authService = inject(AuthService)
  constructor() { }

  createLeads(leads: CreateUserLeadsPayload) {
		const payload: CreateUserLeadsPayload = {
			...leads,
		}
		return this._http.post<ApiResponse<any>>(`${this.apiURL}/leads`, payload);
	}
  getUser() {
    return this._authService.getLoggedInStaff()?.staff.id ?? "";
  }
  getLeads() {
		return this._http.get<ApiResponse<any[]>>(`${this.apiURL}/leads`)
	}

	getALeads(id:number) {
		return this._http.get<ApiResponse<any[]>>(`${this.apiURL}/leads/${id}`)
	}
}
