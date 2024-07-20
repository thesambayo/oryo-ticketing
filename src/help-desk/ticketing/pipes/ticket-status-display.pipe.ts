import { Pipe, PipeTransform } from '@angular/core';
import { TicketItemStatus, statusDisplay } from '../models/ticket-item';

@Pipe({
  name: 'ticketStatusDisplay',
  standalone: true
})
export class TicketStatusDisplayPipe implements PipeTransform {

  transform(status?: TicketItemStatus): string {
    return status ? statusDisplay[status] : '';
  }

}
