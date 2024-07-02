import { Routes } from '@angular/router';

export const ticketsRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/tickets-list/tickets-list.component').then(m => m.TicketsListComponent)
	},
	{
		path: 'ticket-view',
		loadComponent: () => import('./components/ticket-view/ticket-view.component').then(m => m.TicketViewComponent)
	},

];