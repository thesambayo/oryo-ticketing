import { Routes } from '@angular/router';

export const DetailsRoutes: Routes = [
	{
        path: '',
        loadComponent: () => import('../noc-client-details/noc-client-details.component').then(m => m.NocClientDetailsComponent)
    },
    // {
    //     path: 'details-report',
    //     loadComponent: () => import('../noc-client-details/report/report.component').then(m => m.ReportComponent)
    // },
    // {
    //     path: 'details',
    //     loadComponent: () => import('./noc-client-details/noc-client-details.component').then(m => m.NocClientDetailsComponent)
    // },

];

