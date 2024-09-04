import { NgClass, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideSearch, lucideEllipsisVertical, lucidePlus, lucideChevronsUpDown, lucideFilter } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogHeaderComponent, HlmDialogFooterComponent, HlmDialogTitleDirective, HlmDialogDescriptionDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnPopoverComponent, BrnPopoverTriggerDirective, BrnPopoverContentDirective, BrnPopoverCloseDirective } from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective, HlmPopoverCloseDirective } from '@spartan-ng/ui-popover-helm';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioIndicatorComponent, HlmRadioDirective, HlmRadioGroupDirective } from '@spartan-ng/ui-radiogroup-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmTableComponent, HlmTrowComponent, HlmThComponent, HlmTdComponent, HlmCaptionComponent } from '@spartan-ng/ui-table-helm';
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import { TopbarService } from '../../help-desk/core/services/topbar.service';
import { TicketItem } from '../../help-desk/ticketing/models/ticket-item';
import { TicketPriorityDisplayPipe } from '../../help-desk/ticketing/pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../help-desk/ticketing/pipes/ticket-status-display.pipe';
import { LeftPaddingPipe } from '../../libs/pipes/left-padding.pipe';
import { StaffService } from '../../libs/services/staff.service';
import { AddStaffComponent } from "../add-staff/add-staff.component";

@Component({
  selector: 'oryo-staff-list',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    RouterLink,
    LeftPaddingPipe,
    TicketStatusDisplayPipe,
    TicketPriorityDisplayPipe,
    HlmSpinnerComponent,
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
    BrnSelectImports,
    HlmSelectImports,
    AddStaffComponent
],
	providers: [provideIcons({ lucideBell, lucideSearch, lucideEllipsisVertical, lucidePlus, lucideChevronsUpDown, lucideFilter })],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent {
	_topbarService = inject(TopbarService);
	_staffService = inject(StaffService);

	staffList = this._staffService.staffList;

	isLoading = signal<boolean>(false);
	activeTicket = signal<TicketItem | undefined>(undefined);

	ngOnInit(): void {
		this._topbarService.updateTopbarDetails({
			title: "Tickets",
			backRoute: undefined,
		});
	}

	// changeTicketStatus(ticketId: number, status: TicketItemStatus) {
	// 	const payload = {
	// 		status
	// 	} as CreateTicketItemPayload;

	// 	this._ticketsService.updateTicket(ticketId, payload).subscribe({
	// 		next: (res) => {
	// 			this.getAllTickets();
	// 			toast.success("Ticket closed successfully", {
	// 				id: "close-ticket-success"
	// 			});
	// 		},
	// 		error: (err) => {
	// 			toast.success("Close ticket failed", {
	// 				id: "close-ticket-failure"
	// 			});
	// 		}
	// 	})
	// }
}
