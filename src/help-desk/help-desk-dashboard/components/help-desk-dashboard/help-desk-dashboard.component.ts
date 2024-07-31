import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AgCharts } from 'ag-charts-angular';

import { lucideArrowUp, lucideTicket } from '@ng-icons/lucide';
import { TopbarService } from '../../../core/services/topbar.service';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { DashboardService } from '../../services/dashboard.service';
import { getData } from './help-desk-dashboard.constants';

interface ChartOption {
	title: {
		text: string;
	};
	subtitle: {
		text: string;
	};
	data: any[];
	series: {
		type: string;
		angleKey: string;
		legendItemKey: string;
	}[];
}

@Component({
	selector: 'oryo-dashboard',
	standalone: true,
	imports: [
		HlmIconComponent,
		JsonPipe,
		AgCharts
	],
	providers: [provideIcons({ lucideArrowUp, lucideTicket })],
	templateUrl: './help-desk-dashboard.component.html',
	styleUrl: './help-desk-dashboard.component.css'
})
export class HelpDeskDashboardComponent implements OnInit {
	_topbarService = inject(TopbarService);
	dashboardDetails = inject(DashboardService).dashboardDetails;

	options = computed<any>(() => ({
		title: {
			text: "Tickets Statuses",
		},
		// subtitle: {
		// 	text: "In Billion U.S. Dollars",
		// },
		data: this.objectToArray(this.dashboardDetails()),
		series: [
			{
				type: "pie",
				angleKey: "value",
				legendItemKey: "key",
			},
		],
	}))

	ngOnInit(): void {
		this._topbarService.updateTopbarDetails({
			title: "Welcome to Service Desk",
		});
	}

	objectToArray(obj: any) {
		return Object.entries(obj).map(([key, value]) => ({ key, value }));
	}
}
