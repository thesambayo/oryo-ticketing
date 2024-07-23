import { Injectable, inject } from '@angular/core';
import { CreateTicketItemPayload, TicketItem, TicketItemPriority, TicketItemStatus, UpdateTicketItemPayload } from '../models/ticket-item';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../libs/models/model';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class TicketsService {
	apiURL = environment.apiURL;
	_http = inject(HttpClient);

	constructor() { }

	getTickets() {
		return this._http.get<ApiResponse<TicketItem[]>>(`${this.apiURL}/tickets`)
	}

	// should handle ticket creation from both reporting and internal forms
	createTicket(ticket: CreateTicketItemPayload) {
		const payload: CreateTicketItemPayload = {
			...ticket,
			priority: ticket.priority ?? TicketItemPriority.HIGH,
			status: ticket.status ?? TicketItemStatus.OPEN,
			assignee: 1 // should default to a staff with permissionn of servicedesk:manager
		}
		return this._http.post<ApiResponse<TicketItem>>(`${this.apiURL}/tickets`, payload);
	}

	getTicket(id: number) {
		return this._http.get<ApiResponse<TicketItem>>(`${this.apiURL}/tickets/${id}`);
	}

	updateTicket(id: number, ticket: UpdateTicketItemPayload) {
		return this._http.patch<ApiResponse<TicketItem>>(`${this.apiURL}/tickets/${id}`, ticket);
	}



}
