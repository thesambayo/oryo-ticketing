import { Injectable, inject } from '@angular/core';
import { CreateTicketItemPayload, TicketItem, TicketItemPriority, TicketItemStatus } from '../models/ticket-item';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../libs/models/model';

const LOCAL_DEV_BD = "http://localhost:5800/v1"

@Injectable({
	providedIn: 'root'
})
export class TicketsService {
	_http = inject(HttpClient);

	constructor() { }

	padNumber(value: string, length: number, padCharacter: string = '0'): string {
		let processedValue = typeof value === 'number' ? String(value) : value;
		if (processedValue.length >= length) {
			return processedValue;
		}

		while (processedValue.length < length) {
			processedValue = padCharacter + processedValue;
		}

		return processedValue;
	}

	getTickets() {
		return this._http.get<ApiResponse<TicketItem[]>>(`${LOCAL_DEV_BD}/tickets`)
	}

	// should handle ticket creation from both reporting and internal forms
	createTicket(ticket: CreateTicketItemPayload) {
		const payload: CreateTicketItemPayload = {
			...ticket,
			priority: ticket.priority ?? TicketItemPriority.HIGH,
			status: ticket.status ?? TicketItemStatus.OPEN,
			assignee: 1 // should default to a staff with permissionn of servicedesk:manager
		}
		return this._http.post<ApiResponse<TicketItem>>(`${LOCAL_DEV_BD}/tickets`, payload);
	}

	getTicket(id: number) {
		return this._http.get<ApiResponse<TicketItem>>(`${LOCAL_DEV_BD}/tickets/${id}`);
	}

	updateTicket(id: number, ticket: CreateTicketItemPayload) {
		return this._http.put<ApiResponse<TicketItem>>(`${LOCAL_DEV_BD}/tickets/${id}`, ticket);
	}



}
