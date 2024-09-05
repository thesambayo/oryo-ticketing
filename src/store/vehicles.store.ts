import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from './vehicles.service';
import { pipe, tap, switchMap, catchError } from 'rxjs';
import { VehiclesGlobalReport, VehicleInfo } from '../noc/noc.model';

export interface VehiclesClient {
	id: number;
	altId: number;
	companyName: string;
	totalVehicles: number;
}

export interface VehiclesState {
	clients: VehiclesClient[];
	vehicles: VehicleInfo[];
	globalReports: VehiclesGlobalReport | null;
	loadingClients: boolean;
	loadingVehicles: boolean;
	loadingGlobalReports: boolean;
}

const initialState: VehiclesState = {
	clients: [],
	vehicles: [],
	globalReports: null,
	loadingClients: false,
	loadingVehicles: false,
	loadingGlobalReports: false,
}

export const VehiclesStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed((store) => ({
		totalVehiclesFromAllClients: computed(() =>
			store.clients().reduce((sum, client) => sum + client.totalVehicles, 0)
		),
		noSignalVehicles: computed(() => {
			const totalVehicles = store.clients().reduce((sum, client) => sum + client.totalVehicles, 0);

			const totalReportingVehicles = store.globalReports()?.totalVehicles ?? 0;
			return totalVehicles - totalReportingVehicles;
		})
	})),

	withMethods(
		(store, _vehiclesService = inject(VehiclesService)) => ({

			/** get all clients that are provided with vehicles */
			loadAllClients: rxMethod<void>(
				pipe(
					tap((_args) => patchState(store, { loadingClients: true })),
					switchMap(() => _vehiclesService.getVehiclesClients()),
					tap((res) => patchState(store, { clients: res.data, loadingClients: false })),
					catchError((err) => {
						patchState(store, { loadingClients: false });
						console.log(err, "error")
						throw new Error(err);
					})
				)
			),

			/** get all vehicles for all clients */
			loadAllVehicles: rxMethod<void>(
				pipe(
					tap((_args) => patchState(store, { loadingVehicles: true })),
					switchMap(() => _vehiclesService.getVehicles()),
					tap((res) => patchState(store, { vehicles: res.data, loadingVehicles: false })),
					catchError((err) => {
						patchState(store, { loadingVehicles: false });
						console.log(err, "error")
						throw new Error(err);
					})
				)
			),

			/** get global reports for vehicles */
			loadGlobalReports: rxMethod<void>(
				pipe(
					tap((_args) => patchState(store, { loadingGlobalReports: true })),
					switchMap(() => _vehiclesService.getVehiclesGlobalReports()),
					tap((res) => patchState(store, { globalReports: res.data, loadingGlobalReports: false })),
					catchError((err) => {
						patchState(store, { loadingGlobalReports: false });
						console.log(err, "error")
						throw new Error(err);
					})
				)
			),

		})
	),
	withHooks((store) => ({
		onInit: () => {
			store.loadAllClients();
			store.loadGlobalReports();
			store.loadAllVehicles();
		},
		// onDestroy() {
		//   console.log('firstName on destroy', firstName());
		// },
	}))
)