import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketStatusBadgeVariant',
  standalone: true
})
export class TicketStatusBadgeVariantPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
