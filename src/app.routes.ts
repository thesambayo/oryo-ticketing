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
		path: 'activate/:token',
		loadComponent: () => import('./auth/activate-staff/activate-staff.component').then(m => m.ActivateStaffComponent),
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
	}

];

