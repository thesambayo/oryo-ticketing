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
		path: 'noc',
		loadChildren: () => import('./noc/noc.route').then(m => m.NocRoutes),
		canActivate: [isLoggedInGuard]
	}

];

