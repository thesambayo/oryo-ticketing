import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/home-view/home-view.component').then(m => m.HomeViewComponent),
		children: [
			{
				path: '',
				loadComponent: () => import('./dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
			},
			{
				path: 'tickets',
				loadChildren: () => import('./ticketing/tickets-routes').then(m => m.ticketsRoutes)
			},
			{
				path: 'customers',
				loadChildren: () => import('./customers/customers-routes').then(m => m.customersRoutes)
			}
		]
	},

	{
		path: 'report-form',
		loadComponent: () => import('./report-form/report-form.component').then(m => m.ReportFormComponent)
	},
	{
		path: 'internal-form',
		loadComponent: () => import('./internal-form/internal-form.component').then(m => m.InternalFormComponent)
	},

];

