import { Routes } from "@angular/router";

export const NocRoutes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./components/noc-container/noc-container.component").then((m) => m.NocContainerComponent),
		children: [
			{
				path: "",
				loadComponent: () =>
					import("./noc-main-dashboard/noc-main-dashboard.component").then(
						(m) => m.NocMainDashboardComponent
					),
			},
			{
				path: "reports",
				children: [
					{
						path: "",
						loadComponent: () =>
							import("./noc-dashboard/noc-dashboard.component").then((m) => m.NocDashboardComponent),
					},
				],
			},
			{
				path: "clients",
				children: [
					{
						path: "",
						loadComponent: () =>
							import("./noc-clients/noc-clients.component").then((m) => m.NocClientsComponent),
					},
					{
						path: ":id",
						loadChildren: () =>
							import("./noc-client-details/noc-client-details.route").then((m) => m.DetailsRoutes),
					},
				],
			},
			// {
			// 	path: 'details/:id',
			// 	loadChildren: () => import('./noc-client-details/noc-client-details.route').then(m => m.DetailsRoutes)
			// },
		],
	},
];
