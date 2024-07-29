import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideSearch, lucideMoveHorizontal, lucidePlus, lucideChevronsUpDown, lucideFilter } from '@ng-icons/lucide';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnPopoverComponent, BrnPopoverTriggerDirective, BrnPopoverContentDirective, BrnPopoverCloseDirective } from '@spartan-ng/ui-popover-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { TicketPriorityDisplayPipe } from '../../help-desk/ticketing/pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../help-desk/ticketing/pipes/ticket-status-display.pipe';
import { LeftPaddingPipe } from '../../libs/pipes/left-padding.pipe';
import { HlmBadgeDirective } from '../../libs/ui/ui-badge-helm/src/lib/hlm-badge.directive';
import { HlmButtonDirective } from '../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCheckboxComponent } from '../../libs/ui/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { HlmDialogContentComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-content.component';
import { HlmDialogDescriptionDirective } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-description.directive';
import { HlmDialogFooterComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-footer.component';
import { HlmDialogHeaderComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogTitleDirective } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-title.directive';
import { HlmDialogComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.component';
import { HlmIconComponent } from '../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmPopoverCloseDirective } from '../../libs/ui/ui-popover-helm/src/lib/hlm-popover-close.directive';
import { HlmPopoverContentDirective } from '../../libs/ui/ui-popover-helm/src/lib/hlm-popover-content.directive';
import { HlmRadioGroupDirective } from '../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-group.directive';
import { HlmRadioIndicatorComponent } from '../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-indicator.component';
import { HlmRadioDirective } from '../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio.directive';
import { HlmSpinnerComponent } from '../../libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { HlmCaptionComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-caption.component';
import { HlmTableComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmTdComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-td.component';
import { HlmThComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTrowComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { HlmSmallDirective } from '../../libs/ui/ui-typography-helm/src/lib/hlm-small.directive';
import { CreateBdmComponent } from '../bdm/components/create-bdm/create-bdm.component';
import { ViewBdmComponent } from '../bdm/components/view-bdm/view-bdm.component';
import { TicketsService } from '../../help-desk/ticketing/services/tickets.service';
import { getStatusVariant, getPriorityVariant, TicketItem, TicketItemPriority, TicketItemStatus } from '../bdm/models/bdm-item';
import { Router } from '@angular/router';

@Component({
  selector: 'oryo-leads-list',
  standalone: true,
	imports: [
		HlmButtonDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmTableComponent,
		HlmTrowComponent,
		HlmThComponent,
		HlmCheckboxComponent,
		HlmTdComponent,
		HlmCaptionComponent,
		HlmBadgeDirective,
		DatePipe,
		LeftPaddingPipe,
		NgClass,
		TicketPriorityDisplayPipe,
		TicketStatusDisplayPipe,

		HlmMenuModule,
		BrnMenuTriggerDirective,


		BrnPopoverComponent,
		BrnPopoverTriggerDirective,
		BrnPopoverContentDirective,
		BrnPopoverCloseDirective,
		HlmPopoverContentDirective,
		HlmPopoverCloseDirective,
		HlmLabelDirective,

		BrnRadioGroupComponent,
		BrnRadioComponent,
		HlmRadioIndicatorComponent,
		HlmRadioDirective,
		HlmRadioGroupDirective,
		HlmSmallDirective,

		BrnDialogTriggerDirective,
		BrnDialogContentDirective,

		HlmDialogComponent,
		HlmDialogContentComponent,
		HlmDialogHeaderComponent,
		HlmDialogFooterComponent,
		HlmDialogTitleDirective,
		HlmDialogDescriptionDirective,
		BrnSelectImports,
		HlmSelectImports,

    CreateBdmComponent,
    ViewBdmComponent,
		HlmSpinnerComponent
	],
	providers: [provideIcons({ lucideBell, lucideSearch, lucideMoveHorizontal, lucidePlus, lucideChevronsUpDown, lucideFilter })],
  templateUrl: './leads-list.component.html',
  styleUrl: './leads-list.component.css'
})
export class LeadsListComponent implements OnInit {
	getStatusVariant = getStatusVariant;
	getPriorityVariant = getPriorityVariant;
	_ticketsService = inject(TicketsService);
  _router = inject(Router)

	isLoading = signal<boolean>(false);
	_tickets = signal<TicketItem[]>([]);
  getView = signal<boolean>(false)

	ngOnInit(): void {
		this.getAllTickets();
		// this._ticketsService.getTickets().then((data) => {
		//   if (data) {
		//     this._tickets.set(data);
		//   }
		// });
	}

	getAllTickets() {
		// this.isLoading.set(true);
    this._tickets.set([{
      id: "1",
      reporterName: "John Doe",
      reporterEmail: "johndoe@example.com",
      reporterCompany: "Example Corp",
      subject: "Issue with login",
      priority: TicketItemPriority.HIGH,
      status: TicketItemStatus.OPEN,
      description: "Unable to login with the provided credentials.",
      attachments: ["screenshot1.png"],
      dateCreated: "2024-07-01T10:30:00Z",
      dateResolved: ""
    },
    {
      id: "2",
      reporterName: "Jane Smith",
      reporterEmail: "janesmith@example.com",
      reporterCompany: "Tech Solutions",
      subject: "Payment gateway error",
      priority: TicketItemPriority.URGENT,
      status: TicketItemStatus.IN_PROGRESS,
      description: "Receiving an error message when trying to process payments.",
      attachments: ["errorlog.txt", "screenshot2.png"],
      dateCreated: "2024-07-02T11:00:00Z",
      dateResolved: ""
    },
    {
      id: "3",
      reporterName: "Mike Johnson",
      reporterEmail: "mikejohnson@example.com",
      reporterCompany: "Innovatech",
      subject: "Feature request for dashboard",
      priority: TicketItemPriority.MEDIUM,
      status: TicketItemStatus.RESOLVED,
      description: "Request to add a new chart to the dashboard.",
      attachments: [],
      dateCreated: "2024-06-28T09:15:00Z",
      dateResolved: "2024-07-03T14:30:00Z"
    },
    {
      id: "4",
      reporterName: "Emily Davis",
      reporterEmail: "emilydavis@example.com",
      reporterCompany: "BizWorks",
      subject: "Slow performance on app",
      priority: TicketItemPriority.LOW,
      status: TicketItemStatus.CLOSED,
      description: "The application is running slower than usual.",
      attachments: ["performance_report.pdf"],
      dateCreated: "2024-06-25T08:45:00Z",
      dateResolved: "2024-07-01T16:00:00Z"
    }])
	}
  onVeiw(e: any) {
    this._router.navigate(['business-development', 'view-bdm']);
  }
}
