import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../libs/models/model';
import { VehiclesClient } from './vehicles.store';
import {
  ClientVehicle,
  VehicleReport,
  VehiclesGlobalReport,
} from '../noc/noc.model';
import { environment } from '../environments/environment';

interface GetVehiclesParams {
  companyWlfId?: string;
  sensorStatus?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  nodeApiURL = ' http://localhost:6200';
  apiURL = environment.apiURL;
  _http = inject(HttpClient);

  getVehiclesClients() {
    return this._http.get<ApiResponse<VehiclesClient[]>>(
      `${this.apiURL}/clients`,
    );
  }

  getAllVehiclesReports() {
    return this._http.get<ApiResponse<VehicleReport[]>>(
      `${this.apiURL}/latest-reports`,
    );
  }

  getCompanyVehicles() {
    return this._http.get<ApiResponse<ClientVehicle[]>>(
      `${this.apiURL}/clients-vehicles`,
    );
  }

  getVehiclesGlobalReports() {
    return this._http.get<ApiResponse<VehiclesGlobalReport>>(
      `${this.apiURL}/global-reports`,
    );
  }

  getVehiclesByStatus(status = 'total') {
    return this._http.get<ApiResponse<ClientVehicle[]>>(
      `${this.apiURL}/vehicles?sensorStatus=` + status,
    );
  }

  getVehiclesByParams(paramsArgs: GetVehiclesParams) {
    const params = new HttpParams()
      .set('sensorStatus', paramsArgs.sensorStatus ?? '')
      .set('companyWlfId', paramsArgs.companyWlfId ?? '')
      .set('startDate', paramsArgs.startDate ?? '')
      .set('endDate', paramsArgs.endDate ?? '');

    return this._http.get<ApiResponse<ClientVehicle[]>>(
      `${this.apiURL}/vehicles`,
      { params },
    );
  }

  // getNonReportingVehicles() {
  // 	return this._http.get<ApiResponse<ClientVehicle[]>>(`${this.apiURL}/non-reporting-vehicles`)
  // }

  getHeadersToCSV(allowedHeaders: Record<string, string>[]): string {
    let headerString = '';
    allowedHeaders.forEach((header) => {
      const headerkey = Object.keys(header)[0];
      // for header value for only the first loop
      if (headerString !== '') headerString += ',';
      headerString += header[headerkey];
    });
    return headerString;
  }

  convertToCSV(
    objArray: Record<string, string>[],
    allowedHeaders: Record<string, string>[],
  ): string {
    let str = '';
    const headerString = this.getHeadersToCSV(allowedHeaders);

    for (let i = 0; i < objArray.length; i++) {
      const record = objArray[i];
      let line = '';

      allowedHeaders.forEach((header) => {
        const headerkey = Object.keys(header)[0];
        const headerColumnValue = record[headerkey];
        if (line !== '') line += ',';
        line += headerColumnValue ?? '';
      });
      str += line + '\r\n';
    }

    return headerString + '\r\n' + str;
  }

  exportCSVFile(headers: any[], items: any[], fileTitle: string): void {
    const csv = this.convertToCSV(items, headers);
    const exportedFilename = fileTitle + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
