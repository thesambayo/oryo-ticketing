import { Component, inject } from '@angular/core';
import { VehiclesStore } from '../../store/vehicles.store';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { VehicleStatus } from '../noc.model';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';



@Component({
	selector: 'oryo-noc-main-dashboard',
	standalone: true,
	imports: [
		DecimalPipe,
		HlmSpinnerComponent
	],
	templateUrl: './noc-main-dashboard.component.html',
	styleUrl: './noc-main-dashboard.component.css'
})
export class NocMainDashboardComponent {
	readonly VehicleStatuses = VehicleStatus;

	private _router = inject(Router);
	private _vehiclesStore = inject(VehiclesStore);
	vehiclesGlobalReports = this._vehiclesStore.globalReports;
	loadingGlobalReports = this._vehiclesStore.loadingGlobalReports;

	viewVehiclesReportByStatus(status: VehicleStatus) {
		this._router.navigate(["/noc/reports"], {queryParams: {status}})
	}

}
