import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../libs/models/model';
import { VehiclesClient } from './vehicles.store';
import { ClientVehicle, VehicleReport, VehiclesGlobalReport } from '../noc/noc.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
	nodeApiURL = ' http://localhost:6200';
	apiURL = environment.localApiURL;
	_http = inject(HttpClient);

  getVehiclesClients() {
		return this._http.get<ApiResponse<VehiclesClient[]>>(`${this.apiURL}/clients`)
	}

	getAllVehiclesReports() {
		return this._http.get<ApiResponse<VehicleReport[]>>(`${this.apiURL}/latest-reports`)
	}

	getCompanyVehicles() {
		return this._http.get<ApiResponse<ClientVehicle[]>>(`${this.apiURL}/clients-vehicles`)
	}

	getVehiclesGlobalReports() {
		return this._http.get<ApiResponse<VehiclesGlobalReport>>(`${this.apiURL}/global-reports`)
	}

	getNonReportingVehicles() {
		return this._http.get<ApiResponse<ClientVehicle[]>>(`${this.apiURL}/non-reporting-vehicles`)
	}
}
