import { Component, inject, output } from '@angular/core';
import { VehiclesStore } from '../../store/vehicles.store';
import { Router } from '@angular/router';

@Component({
  selector: 'oryo-noc-main-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './noc-main-dashboard.component.html',
  styleUrl: './noc-main-dashboard.component.css'
})
export class NocMainDashboardComponent {
	private _router = inject(Router);
	private _vehiclesStore = inject(VehiclesStore);
	vehiclesGlobalReports = this._vehiclesStore.globalReports;

  getGlobalValue(e:any) {
		this._router.navigateByUrl("/noc/reports/"+e)
  }

}
