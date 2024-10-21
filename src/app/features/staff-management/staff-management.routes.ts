import { Routes } from "@angular/router";

export const staffManagementRoutes: Routes = [
	{
		path: "",
		loadComponent: () => import("./staff-list/staff-list.component").then((m) => m.StaffListComponent),
	},
	// {
	// 	path: 'tickets',
	// 	loadChildren: () => import('./ticketing/tickets-routes').then(m => m.ticketsRoutes)
	// },
	// {
	// 	path: 'customers',
	// 	loadChildren: () => import('./customers/customers-routes').then(m => m.customersRoutes)
	// }
];
