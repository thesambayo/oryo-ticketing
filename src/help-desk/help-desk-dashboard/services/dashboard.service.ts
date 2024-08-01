import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../../libs/models/model';

interface HelpDeskDashboardDetails {
	attended: number;
	resolved: number;
	unAttended: number;
	totalTickets: number;
}

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	apiURL = environment.apiURL;
	_http = inject(HttpClient);

	dashboardDetails = toSignal<HelpDeskDashboardDetails, HelpDeskDashboardDetails>(
		this.getDashboardDetails(),
		{
			initialValue: {
				attended: 0,
				resolved: 0,
				unAttended: 0,
				totalTickets: 0,
			}
		}
	);

	private getDashboardDetails() {
		return this._http.get<ApiResponse<HelpDeskDashboardDetails>>(`${this.apiURL}/helpdesk`)
			.pipe(
				map((res) => res.data),
			)
	}
}