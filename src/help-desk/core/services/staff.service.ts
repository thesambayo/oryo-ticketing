import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../libs/models/model';
import { Staff } from '../models/staff';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class StaffService {
	apiURL = environment.apiURL;
	_http = inject(HttpClient);
	
	staffList = toSignal(this.getStaff(), {initialValue: [] as Staff[]});

	private getStaff() {
		return this._http.get<ApiResponse<Staff[]>>(`${this.apiURL}/staff`)
		.pipe(
			map((res) => res.data),
		)
	}



}
