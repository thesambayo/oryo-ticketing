import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: "full",
		redirectTo: "login"
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'help-desk',
		loadChildren: () => import('./help-desk/help-desk.routes').then(m => m.helpDeskRoutes),
	}

];

