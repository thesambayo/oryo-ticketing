import { Routes } from '@angular/router';

export const routes: Routes = [
	// {
	// 	path: '',
	// 	pathMatch: "full",
	// 	redirectTo: ""
	// },
	{
		path: '',
		loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'rest-password',
		loadComponent: () => import('./auth/password-rest/password-rest.component').then(m => m.PasswordRestComponent),
	},
	{
		path: 'help-desk',
		loadChildren: () => import('./help-desk/help-desk.routes').then(m => m.helpDeskRoutes),
	},
	{
		path: 'bdm',
		loadChildren: () => import('./business-development/bdm.routes').then(m => m.BusinessDevelopmentRoutes),
	}

];

