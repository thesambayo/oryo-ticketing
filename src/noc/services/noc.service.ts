import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../libs/models/model';
import { Companies, RefuelRecord } from '../noc.model';

@Injectable({
  providedIn: 'root'
})
export class NocService {
	apiURL = ' http://localhost:6200';
	_http = inject(HttpClient);
  constructor() { }
  getCompanies() {
		return this._http.get<any>(`${this.apiURL}/cars/clients`)
	}
  getClient(id: number) {
		return this._http.get<any>(`${this.apiURL}/cars/wfl/${id}`)
	}

  getCars() {
		return this._http.get<any>(`${this.apiURL}/cars`)
	}

  getCarsGlobal() {
		return this._http.get<any>(`${this.apiURL}/cars/global-reports`)
	}

  getLogs() {
		return this._http.get<any>(`${this.apiURL}/logs`)
	}
}
