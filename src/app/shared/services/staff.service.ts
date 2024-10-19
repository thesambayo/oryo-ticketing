import { Injectable, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../core/models/api-data';
import { Department, Staff } from '../../features/auth/models/staff';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  apiURL = environment.apiURL;
  _http = inject(HttpClient);

  staffList = toSignal(this.getStaff(), { initialValue: [] as Staff[] });
  bdmStaff = computed(() =>
    this.staffList()
      .filter(
        (staff) => staff.department.name === Department.BUSINESS_DEVELOPMENT
      )
  );
  // bdmStaff = toSignal(this.getStaff(Department.BUSINESS_DEVELOPMENT), {
  //   initialValue: [],
  // });

  getStaff(department?: Department) {
    const params = department
      ? new HttpParams().append('department', department ?? '')
      : new HttpParams();
    return this._http
      .get<ApiResponse<Staff[]>>(`${this.apiURL}/staff`, { params })
      .pipe(map((res) => res.data));
  }
}
