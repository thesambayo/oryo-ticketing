import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { getStatusVariant, getPriorityVariant } from '../../models/ticket-item';
import { TicketsService } from '../../services/tickets.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'oryo-view-ticket-details',
  standalone: true,
  imports: [JsonPipe, HlmButtonDirective, NgTemplateOutlet],
  templateUrl: './view-ticket-details.component.html',
  styleUrl: './view-ticket-details.component.css'
})
export class ViewTicketDetailsComponent {
	getStatusVariant = getStatusVariant;
	getPriorityVariant = getPriorityVariant;
	_ticketsService = inject(TicketsService);
	_activatedRoute = inject(ActivatedRoute);
	
	ticketId = Number(this._activatedRoute.snapshot.params['id']);
	ticketItem = toSignal(this._ticketsService.getTicket(this.ticketId))

}
