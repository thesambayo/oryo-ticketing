import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { TicketItem, TicketItemPriority, TicketItemStatus } from '../models/ticket-item';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  _supabaseClient = inject(SupabaseService);

  // defaultTicketItem: TicketItem = {
  //   id: '', // nanoid(10),
  //   subject: '',
  //   description: '',
  //   priority: TicketItemPriority.MEDIUM,
  //   status: TicketItemStatus.OPEN,
  //   ticketId: '',
  //   customerName: '',
  //   customerEmail: '',
  //   companyName: '',
  //   attachments: [],
  //   dateCreated: '',
  //   dateResolved: ''
  // }
  constructor() { }

  async getTickets() {
    const { data, error } =  await this._supabaseClient.supabaseClient.from('tickets').select();
    if (error) {
      return undefined;
    }
    return data as TicketItem[];
  }

  async createTicket(ticket: TicketItem) {
    await this._supabaseClient.supabaseClient.from('tickets').insert(ticket);
  }
}
