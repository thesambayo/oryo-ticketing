import { Routes } from '@angular/router';

export const customersRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/customers-list/customers-list.component').then(m => m.CustomersListComponent)
	},
	{
		path: 'ticket-view',
		loadComponent: () => import('./components/customer-view/customer-view.component').then(m => m.CustomerViewComponent)
	},

];