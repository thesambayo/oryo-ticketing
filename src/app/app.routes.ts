import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'report-form',
		pathMatch: 'full'
	},
	{
		path: 'report-form',
		loadComponent: () => import('./pages/report-form/report-form.component').then(m => m.ReportFormComponent)
	},
	{
		path: 'internal-form',
		loadComponent: () => import('./pages/internal-form/internal-form.component').then(m => m.InternalFormComponent)
	},
	{
		path: 'ticket-view',
		loadComponent: () => import('./pages/ticket-view/ticket-view.component').then(m => m.TicketViewComponent)
	},
	{
		path: 'tickets-list',
		loadComponent: () => import('./pages/tickets-list/tickets-list.component').then(m => m.TicketsListComponent)
	}

];
