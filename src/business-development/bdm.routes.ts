import { Routes } from '@angular/router';

export const BusinessDevelopmentRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/bdm-container/bdm-container.component').then(m => m.BdmContainerComponent),
		children: [
			{
				path: '',
				loadComponent: () => import('./bdm/bdm.component').then(m => m.BdmComponent)
			},
			{
				path: 'view-bdm',
				loadComponent: () => import('./bdm/components/view-bdm/view-bdm.component').then(m => m.ViewBdmComponent)
			},
			{
				path: 'leads',
				loadComponent: () => import('./leads-list/leads-list.component').then(m => m.LeadsListComponent)
			},
			{
				path: 'budget',
				loadComponent: () => import('./budget/budget.component').then(m => m.BudgetComponent)
			},
<<<<<<< HEAD
			// {
			// 	path: 'customers',
			// 	loadChildren: () => import('./customers/customers-routes').then(m => m.customersRoutes)
			// }
=======
>>>>>>> origin/main
		]
	},

];

