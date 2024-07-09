import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { lucideBell, lucideChevronsUpDown, lucideFilter, lucideMoreHorizontal, lucidePlus, lucideSearch } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmCaptionComponent, HlmTableComponent, HlmTdComponent, HlmThComponent, HlmTrowComponent } from '@spartan-ng/ui-table-helm';
import { TicketItem, getPriorityVariant, getStatusVariant } from '../../models/ticket-item';
import { TicketPriorityDisplayPipe } from '../../pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../pipes/ticket-status-display.pipe';
import { TicketsService } from '../../services/tickets.service';
import { ticketItems } from './tickets-list.constants';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmPopoverContentDirective, HlmPopoverCloseDirective } from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioIndicatorComponent, HlmRadioDirective, HlmRadioGroupDirective } from '@spartan-ng/ui-radiogroup-helm';
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogHeaderComponent, HlmDialogFooterComponent, HlmDialogTitleDirective, HlmDialogDescriptionDirective } from '@spartan-ng/ui-dialog-helm';


@Component({
  selector: 'oryo-tickets-list',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmCheckboxComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    HlmBadgeDirective,
    DatePipe,
    NgClass,
    TicketPriorityDisplayPipe,
    TicketStatusDisplayPipe,

    HlmMenuModule,
    BrnMenuTriggerDirective,


    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    HlmLabelDirective,

    BrnRadioGroupComponent,
    BrnRadioComponent,
    HlmRadioIndicatorComponent,
    HlmRadioDirective,
    HlmRadioGroupDirective,
    HlmSmallDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
  ],
  providers: [provideIcons({ lucideBell, lucideSearch, lucideMoreHorizontal, lucidePlus, lucideChevronsUpDown, lucideFilter })],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {
  getStatusVariant = getStatusVariant;
  getPriorityVariant = getPriorityVariant;
  // _supbaseService = inject(SupabaseService);
  _ticketsService = inject(TicketsService);

  _tickets = signal<TicketItem[]>(ticketItems);

  ngOnInit(): void {
    // this._ticketsService.getTickets().then((data) => {
    //   if (data) {
    //     this._tickets.set(data);
    //   }
    // });
  }
}
