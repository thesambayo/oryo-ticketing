import { Component, inject, output } from '@angular/core';
import { VehiclesStore } from '../../../store/vehicles.store';

@Component({
  selector: 'oryo-noc-main-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './noc-main-dashboard.component.html',
  styleUrl: './noc-main-dashboard.component.css'
})
export class NocMainDashboardComponent {
	private _vehiclesStore = inject(VehiclesStore);
	vehiclesGlobalReports = this._vehiclesStore.globalReports;
	noSignalVehicles = this._vehiclesStore.noSignalVehicles;

	// declare input and outputs
	getGlobal = output();

  getGlobalValue(e:any) {
    this.getGlobal.emit(e)
  }

}
