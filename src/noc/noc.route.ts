import { Routes } from '@angular/router';

export const NocRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/noc-container/noc-container.component').then(m => m.NocContainerComponent),
		children: [
			{
				path: '',
				loadComponent: () => import('./noc-dashboard/noc-dashboard.component').then(m => m.NocDashboardComponent)
			},
			{
				path: 'noc-clients',
				loadComponent: () => import('./noc-clients/noc-clients.component').then(m => m.NocClientsComponent)
			},
			{
				path: 'details',
				loadChildren: () => import('./noc-client-details/noc-client-details.route').then(m => m.DetailsRoutes)
			},
		// 	{
		// 		path: 'report',
		// 		loadComponent: () => import('./report/report.component').then(m => m.ReportComponent)
		// 	},
		// 	{
		// 		path: 'budget',
		// 		loadComponent: () => import('./budget/budget.component').then(m => m.BudgetComponent)
		// 	},
		]
	},

];

