import { inject, Injectable } from '@angular/core';
import { CreateUserBudgetPayload } from '../../models/bdm-item';
import { ApiResponse } from '../../../../libs/models/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../../libs/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
	apiURL = environment.apiURL;
	_http = inject(HttpClient);
  _authService = inject(AuthService)
  constructor() { }

  createBudget(budget: CreateUserBudgetPayload) {
		const payload: CreateUserBudgetPayload = {
			...budget,
		}
		return this._http.post<ApiResponse<any>>(`${this.apiURL}/budgets`, payload);
	}
  getUser() {
    return this._authService.getLoggedInStaff()?.staff.id ?? "";
  }
  getBudget() {
		return this._http.get<ApiResponse<any[]>>(`${this.apiURL}/budgets`)
	}
}
