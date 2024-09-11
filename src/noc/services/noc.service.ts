import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NocService {
	apiURL = 'http://localhost:5800/v1/clients-vehicles';
	_http = inject(HttpClient);

	// getCompanyVehicles() {
	// 	return this._http.get(this.apiURL);
	// }
}
