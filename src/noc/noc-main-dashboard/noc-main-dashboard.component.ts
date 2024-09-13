import { Component, inject } from '@angular/core';
import { VehiclesStore } from '../../store/vehicles.store';
import { NavigationExtras, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { VehicleStatus } from '../noc.model';



@Component({
	selector: 'oryo-noc-main-dashboard',
	standalone: true,
	imports: [
		DecimalPipe
	],
	templateUrl: './noc-main-dashboard.component.html',
	styleUrl: './noc-main-dashboard.component.css'
})
export class NocMainDashboardComponent {
	readonly VehicleStatuses = VehicleStatus;

	private _router = inject(Router);
	private _vehiclesStore = inject(VehiclesStore);
	vehiclesGlobalReports = this._vehiclesStore.globalReports;

	viewVehiclesReportByStatus(status: VehicleStatus) {
		this._router.navigate(["/noc/reports"], {queryParams: {status}})
	}

}
