import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../../libs/models/model';
import { TicketCustomer } from '../components/model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

	apiURL = environment.apiURL;
	_http = inject(HttpClient);


	getCustomersInfo() {
		return this._http.get<ApiResponse<TicketCustomer[]>>(`${this.apiURL}/tickets-customers`)
	}
}
