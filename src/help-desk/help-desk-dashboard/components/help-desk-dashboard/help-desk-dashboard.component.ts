import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../../core/services/topbar.service';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideArrowUp, lucideTicket } from '@ng-icons/lucide';
import { DashboardService } from '../../services/dashboard.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'oryo-dashboard',
  standalone: true,
  imports: [
		HlmIconComponent,
		JsonPipe
	],
	providers: [provideIcons({ lucideArrowUp, lucideTicket })],
  templateUrl: './help-desk-dashboard.component.html',
  styleUrl: './help-desk-dashboard.component.css'
})
export class HelpDeskDashboardComponent implements OnInit {
	_topbarService = inject(TopbarService);
	dashboardDetails = inject(DashboardService).dashboardDetails;

	ngOnInit(): void {
		this._topbarService.updateTopbarDetails({
			title: "Welcome to Service Desk",
		})
	}
}
