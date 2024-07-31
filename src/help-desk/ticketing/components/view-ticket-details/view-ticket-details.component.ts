import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { getStatusVariant, getPriorityVariant } from '../../models/ticket-item';
import { TicketsService } from '../../services/tickets.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmMuted } from '@spartan-ng/ui-typography-helm';
import { TopbarService } from '../../../core/services/topbar.service';

@Component({
  selector: 'oryo-view-ticket-details',
  standalone: true,
  imports: [JsonPipe, DatePipe, HlmButtonDirective, NgTemplateOutlet],
  templateUrl: './view-ticket-details.component.html',
  styleUrl: './view-ticket-details.component.css'
})
export class ViewTicketDetailsComponent implements OnInit {
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
