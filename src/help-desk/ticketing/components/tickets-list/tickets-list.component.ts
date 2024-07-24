import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { lucideBell, lucideChevronsUpDown, lucideFilter, lucideEllipsisVertical, lucidePlus, lucideSearch } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmCaptionComponent, HlmTableComponent, HlmTdComponent, HlmThComponent, HlmTrowComponent } from '@spartan-ng/ui-table-helm';
import { CreateTicketItemPayload, TicketItem, TicketItemPriority, TicketItemStatus, getPriorityVariant, getStatusVariant } from '../../models/ticket-item';
import { TicketPriorityDisplayPipe } from '../../pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../pipes/ticket-status-display.pipe';
import { TicketsService } from '../../services/tickets.service';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmPopoverContentDirective, HlmPopoverCloseDirective } from '@spartan-ng/ui-popover-helm';
import {
	BrnPopoverComponent,
	BrnPopoverTriggerDirective,
	BrnPopoverContentDirective,
	BrnPopoverCloseDirective,
} from '@spartan-ng/ui-popover-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioIndicatorComponent, HlmRadioDirective, HlmRadioGroupDirective } from '@spartan-ng/ui-radiogroup-helm';
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogHeaderComponent, HlmDialogFooterComponent, HlmDialogTitleDirective, HlmDialogDescriptionDirective } from '@spartan-ng/ui-dialog-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { LeftPaddingPipe } from '../../../../libs/pipes/left-padding.pipe';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { AssignTicketComponent } from '../assign-ticket/assign-ticket.component';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';


@Component({
	selector: 'oryo-tickets-list',
	standalone: true,
	imports: [
		NgClass,
		DatePipe,
		RouterLink,
		LeftPaddingPipe,
		TicketStatusDisplayPipe,
		TicketPriorityDisplayPipe,
		AssignTicketComponent,
		CreateTicketComponent,


		HlmSpinnerComponent,

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
	],
	providers: [provideIcons({ lucideBell, lucideSearch, lucideEllipsisVertical, lucidePlus, lucideChevronsUpDown, lucideFilter })],
	templateUrl: './tickets-list.component.html',
	styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {
	readonly TicketsStatuses = TicketItemStatus;
	readonly TicketsPriorities = TicketItemPriority;

	getStatusVariant = getStatusVariant;
	getPriorityVariant = getPriorityVariant;
	_ticketsService = inject(TicketsService);

	isLoading = signal<boolean>(false);
	_tickets = signal<TicketItem[]>([]);
	activeTicket = signal<TicketItem | undefined>(undefined);

	ngOnInit(): void {
		this.getAllTickets();
	}

	getAllTickets() {
		this.isLoading.set(true);
		this._ticketsService.getTickets().subscribe({
			next: (res) => {
				this.isLoading.set(false);
				this._tickets.set(res.data);
			},
			error: () => {
				this.isLoading.set(false);
			}
		})
	}

	closeTicket(ticketId: number) {
		const payload = {
			status: TicketItemStatus.CLOSED
		} as CreateTicketItemPayload;
		this._ticketsService.updateTicket(ticketId, payload).subscribe({
			next: (res) => {
				this.getAllTickets();
				toast.success("Ticket closed successfully", {
					id: "close-ticket-success"
				});
			},
			error: (err) => {
				toast.success("Close ticket failed", {
					id: "close-ticket-failure"
				});
			}
		})
	}



}
