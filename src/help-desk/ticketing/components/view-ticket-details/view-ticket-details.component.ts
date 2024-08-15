import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { getStatusVariant, getPriorityVariant, TicketItemPriority, TicketItemStatus } from '../../models/ticket-item';
import { TicketsService } from '../../services/tickets.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TopbarService } from '../../../core/services/topbar.service';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { TicketStatusDisplayPipe } from '../../pipes/ticket-status-display.pipe';
import { TicketPriorityDisplayPipe } from '../../pipes/ticket-priority-display.pipe';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

@Component({
	selector: 'oryo-view-ticket-details',
	standalone: true,
	imports: [
		JsonPipe,
		DatePipe,
		NgClass,
		HlmButtonDirective,
		NgTemplateOutlet,
		HlmBadgeDirective,
		TicketStatusDisplayPipe,
		TicketPriorityDisplayPipe,
		BrnSelectImports,
		HlmSelectImports
	],
	templateUrl: './view-ticket-details.component.html',
	styleUrl: './view-ticket-details.component.css'
})
export class ViewTicketDetailsComponent implements OnInit {
	readonly TicketsStatuses = TicketItemStatus;
	readonly TicketsPriorities = TicketItemPriority;
	getStatusVariant = getStatusVariant;
	getPriorityVariant = getPriorityVariant;
	_ticketsService = inject(TicketsService);
	_activatedRoute = inject(ActivatedRoute);
	_topbarService = inject(TopbarService);
	
	ticketId = Number(this._activatedRoute.snapshot.params['id']);
	ticketItem = toSignal(this._ticketsService.getTicket(this.ticketId));

	ngOnInit(): void {
		this._topbarService.updateTopbarDetails({
			title: `Ticket ${this.ticketId}`,
			backRoute: "/help-desk/tickets",
		});
	}

}
