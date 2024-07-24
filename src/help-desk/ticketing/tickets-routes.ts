import { Routes } from '@angular/router';

export const ticketsRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/tickets-list/tickets-list.component').then(m => m.TicketsListComponent)
	},
	// {
	// 	path: 'data',
	// 	loadComponent: () => import('./components/table-data.component').then(m => m.DataTablePreviewComponent)
	// },
	{
		path: ':id',
		loadComponent: () => import('./components/view-ticket-details/view-ticket-details.component').then(m => m.ViewTicketDetailsComponent)
	},

];