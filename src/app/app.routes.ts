import { Routes } from '@angular/router';
import { isLoggedInGuard } from './shared/guards/isLoggedIn.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
		canActivate: [isLoggedInGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'activate/:token',
		loadComponent: () => import('./features/auth/pages/activate-staff/activate-staff.component').then(m => m.ActivateStaffComponent),
	},
	{
		path: 'noc',
		loadChildren: () => import('./features/noc/noc.route').then(m => m.NocRoutes),
		canActivate: [isLoggedInGuard]
	}

];

