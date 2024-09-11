import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from './vehicles.service';
import { pipe, tap, switchMap, catchError } from 'rxjs';
import { VehiclesGlobalReport, VehicleReport, ClientVehicle } from '../noc/noc.model';

// export interface VehiclesClient {
// 	id: number;
// 	altId: number;
// 	companyName: string;
// 	totalVehicles: number;
// }

export interface VehiclesClient {
	id: number;
	company_name: string;
	wfl_id: number;
	alternate_wfl_id: {
		Int64: number;
		Valid: boolean;
	};
	total_vehicles: number;
	wfl_username: string;
	wfl_password: string;
	created_at: string;
	updated_at: string;
	version: number;
}

export interface VehiclesState {
	clients: VehiclesClient[];
	vehiclesReports: VehicleReport[];
	companyVehicles: ClientVehicle[];
	globalReports: VehiclesGlobalReport | null;
	nonReportingVehicles: ClientVehicle[];
	loadingClients: boolean;
	loadingVehicles: boolean;
	loadingGlobalReports: boolean;
	loadingCompanyVehicles: boolean;
	selectedCompanyVehiclesId: number | null;
}

const initialState: VehiclesState = {
	clients: [],
	vehiclesReports: [],
	companyVehicles: [],
	nonReportingVehicles: [],
	globalReports: null,
	loadingClients: false,
	loadingVehicles: false,
	loadingGlobalReports: false,
	loadingCompanyVehicles: false,
	selectedCompanyVehiclesId: null
}

export const VehiclesStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed((store) => ({
		totalVehiclesFromAllClients: computed(() =>
			store.clients().reduce((sum, client) => sum + client.total_vehicles, 0)
		),
		// noSignalVehicles: computed(() => {
		// 	const totalVehicles = store.clients().reduce((sum, client) => sum + client.total_vehicles, 0);

		// 	const totalReportingVehicles = store.globalReports()?.total_vehicles ?? 0;
		// 	return totalVehicles - totalReportingVehicles;
		// }),
		selectedCompanyVehicles: computed(() => {
			return store.companyVehicles().find((dd) => dd.id === store.selectedCompanyVehiclesId())
		}),
		selectedCompanyNonReportVehicles: computed(() => {
			return store.nonReportingVehicles().find((dd) => dd.id === store.selectedCompanyVehiclesId())
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
			loadAllVehiclesReports: rxMethod<void>(
				pipe(
					tap((_args) => patchState(store, { loadingVehicles: true })),
					switchMap(() => _vehiclesService.getAllVehiclesReports()),
					tap((res) => patchState(store, { vehiclesReports: res.data, loadingVehicles: false })),
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

			/** get vehicles for vehicles */
			loadCompaniesVehicles: rxMethod<void>(
				pipe(
					tap((_args) => patchState(store, { loadingCompanyVehicles: true })),
					switchMap(() => _vehiclesService.getCompanyVehicles()),
					tap((res) => patchState(store, { companyVehicles: res.data, loadingCompanyVehicles: false })),
					catchError((err) => {
						patchState(store, { loadingCompanyVehicles: false });
						console.log(err, "error")
						throw new Error(err);
					})
				)
			),

			loadNonReportingVehicles: rxMethod<void>(
				pipe(
					// tap((_args) => patchState(store, { loadingCompanyVehicles: true })),
					switchMap(() => _vehiclesService.getNonReportingVehicles()),
					tap((res) => patchState(store, { nonReportingVehicles: res.data })),
					catchError((err) => {
						// patchState(store, { loadingCompanyVehicles: false });
						console.log(err, "error")
						throw new Error(err);
					})
				)
			),

			// changeFirstName(firstName: string) {
			// 	patchState(store, { firstName });
			// },


			setSelectedCompanyVehiclesId(companyId: number): void {
				console.log(companyId)
				patchState(store, { selectedCompanyVehiclesId: companyId });
				// patchState(store, (state) => ({ filter: { ...state.filter, query } }));
			},

		})
	),
	withHooks((store) => ({
		onInit: () => {
			store.loadAllClients();
			store.loadGlobalReports();
			store.loadAllVehiclesReports();
			store.loadNonReportingVehicles();
		},
		// onDestroy() {
		//   console.log('firstName on destroy', firstName());
		// },
	}))
)