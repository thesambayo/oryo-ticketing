import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { lucideBell, lucideMoreHorizontal, lucideSearch } from '@ng-icons/lucide';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmCaptionComponent, HlmTableComponent, HlmTdComponent, HlmThComponent, HlmTrowComponent } from '@spartan-ng/ui-table-helm';
import { TicketItem, TicketItemPriority, TicketItemStatus, getPriorityVariant, getStatusVariant } from '../../models/ticket-item';
import { TicketPriorityDisplayPipe } from '../../pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../pipes/ticket-status-display.pipe';
import { SupabaseService } from '../../../services/supabase.service';
import { TicketsService } from '../../services/tickets.service';


@Component({
  selector: 'oryo-tickets-list',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    HlmBadgeDirective,
    DatePipe,
    NgClass,
    TicketPriorityDisplayPipe,
    TicketStatusDisplayPipe
  ],
  providers: [provideIcons({ lucideBell, lucideSearch, lucideMoreHorizontal })],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {
  getStatusVariant = getStatusVariant;
  getPriorityVariant = getPriorityVariant;
  _supbaseService = inject(SupabaseService);
  _ticketsService = inject(TicketsService);

  _tickets = signal<TicketItem[]>([]);

  ngOnInit(): void {
    this._ticketsService.getTickets().then((data) => {
      if (data) {
        this._tickets.set(data);
      }
    });
  }
}
