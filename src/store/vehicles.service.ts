import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../libs/models/model';
import { VehiclesClient } from './vehicles.store';
import { VehicleInfo, VehiclesGlobalReport } from '../noc/noc.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
	apiURL = ' http://localhost:6200';
	_http = inject(HttpClient);

  getVehiclesClients() {
		return this._http.get<ApiResponse<VehiclesClient[]>>(`${this.apiURL}/cars/clients`)
	}

	getVehicles() {
		return this._http.get<ApiResponse<VehicleInfo[]>>(`${this.apiURL}/cars`)
	}

	getVehiclesGlobalReports() {
		return this._http.get<ApiResponse<VehiclesGlobalReport>>(`${this.apiURL}/cars/global-reports`)
	}
}
