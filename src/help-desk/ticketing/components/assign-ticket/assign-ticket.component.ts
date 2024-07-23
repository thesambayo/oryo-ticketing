import { Component, inject, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogHeaderComponent, HlmDialogFooterComponent, HlmDialogTitleDirective, HlmDialogDescriptionDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { StaffService } from '../../../core/services/staff.service';
import { TicketsService } from '../../services/tickets.service';
import { CreateTicketItemPayload, TicketItem } from '../../models/ticket-item';
import { toast } from 'ngx-sonner';

@Component({
	selector: 'oryo-assign-ticket',
	standalone: true,
	imports: [
		HlmButtonDirective,
		HlmInputDirective,
		HlmLabelDirective,

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
		ReactiveFormsModule,
	],
	templateUrl: './assign-ticket.component.html',
	styleUrl: './assign-ticket.component.css'
})
export class AssignTicketComponent implements OnChanges {

	// declare input and outputs
	ticket = input<TicketItem | undefined>(undefined);
	ticketAssigned = output();
	closeDialog = output();

	// injects, services
	_fb = inject(FormBuilder);
	staffList = inject(StaffService).staffList;
	_ticketsService = inject(TicketsService);
	
	// component variables
	isAssigningTicket = signal<boolean>(false);
	assignTicketForm = this._fb.nonNullable.group({
		assignee: this._fb.nonNullable.control<number | undefined>(this.ticket()?.assigneeId, Validators.required),
	});

	ngOnChanges(changes: SimpleChanges): void {
		if (this.ticket()) {
			this.assignTicketForm.patchValue({
				assignee: this.ticket()?.assigneeId
			})
		}
	}

	onSubmit() {
		const ticketId = this.ticket()?.id;
		if (!this.assignTicketForm.valid || !ticketId) return;
		this.isAssigningTicket.set(true);
		const payload = this.assignTicketForm.value as CreateTicketItemPayload;
		this._ticketsService.updateTicket(ticketId, payload).subscribe({
			next: (res) => {
				this.isAssigningTicket.set(false);
				this.closeDialog.emit();
				this.ticketAssigned.emit();
				toast.success("Ticket assigned successfully", {
					id: "assign-ticket-form-success"
				});
			},
			error: (err) => {
				this.isAssigningTicket.set(false);
				toast.success("Ticket assigning failed", {
					id: "assign-ticket-form-failure"
				});
			}
		})
	}

}
