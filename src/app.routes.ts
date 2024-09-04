import { Routes } from '@angular/router';
import { isLoggedInGuard } from './libs/guards/isLoggedIn.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
		canActivate: [isLoggedInGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'view/:id',
		loadComponent: () => import('./help-desk/ticketing/components/view-ticket-details/view-ticket-details.component').then(m => m.ViewTicketDetailsComponent)
	},
	{
		path: 'activate/:token',
		loadComponent: () => import('./auth/activate-staff/activate-staff.component').then(m => m.ActivateStaffComponent),
	},
	{
		path: 'report-form',
		loadComponent: () => import('./report-form/report-form.component').then(m => m.ReportFormComponent)
	},
	{
		path: 'help-desk',
		loadChildren: () => import('./help-desk/help-desk.routes').then(m => m.helpDeskRoutes),
		canActivate: [isLoggedInGuard]
	},
	{
		path: 'bdm',
		loadChildren: () => import('./business-development/bdm.routes').then(m => m.BusinessDevelopmentRoutes),
		canActivate: [isLoggedInGuard]
	},
	{
		path: 'noc',
		loadChildren: () => import('./noc/noc.route').then(m => m.NocRoutes),
		canActivate: [isLoggedInGuard]
	}

];

