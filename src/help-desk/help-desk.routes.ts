import { Routes } from '@angular/router';

export const helpDeskRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/help-desk-container/help-desk-container.component').then(m => m.HelpDeskContainerComponent),
		children: [
			{
				path: '',
				loadComponent: () => import('./help-desk-dashboard/components/help-desk-dashboard/help-desk-dashboard.component').then(m => m.HelpDeskDashboardComponent)
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

