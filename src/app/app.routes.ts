import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'report-form',
		pathMatch: 'full'
	},
	{
		path: 'report-form',
		loadComponent: () => import('./report-form/report-form.component').then(m => m.ReportFormComponent)
	},
	{
		path: 'internal-form',
		loadComponent: () => import('./internal-form/internal-form.component').then(m => m.InternalFormComponent)
	},
	{
		path: 'tickets',
		loadChildren: () => import('./ticketing/tickets-routes').then(m => m.ticketsRoutes)
	},
	{
		path: 'customers',
		loadChildren: () => import('./customers/customers-routes').then(m => m.customersRoutes)
	}

];

