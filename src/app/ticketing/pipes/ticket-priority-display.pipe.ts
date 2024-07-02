import { Pipe, PipeTransform } from '@angular/core';
import { TicketItemPriority, priorityDisplay } from '../models/ticket-item';

@Pipe({
  name: 'ticketPriorityDisplay',
  standalone: true
})
export class TicketPriorityDisplayPipe implements PipeTransform {

  transform(priority?: TicketItemPriority): string {
    return priority ? priorityDisplay[priority] : '';
  }

}
