import { Component, inject, output, signal } from '@angular/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioIndicatorComponent, HlmRadioDirective, HlmRadioGroupDirective } from '@spartan-ng/ui-radiogroup-helm';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogHeaderComponent, HlmDialogFooterComponent, HlmDialogTitleDirective, HlmDialogDescriptionDirective } from '@spartan-ng/ui-dialog-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CreateTicketItemPayload, TicketItem, TicketItemPriority, TicketItemStatus } from '../../models/ticket-item';
import { toast } from 'ngx-sonner';
import { TicketsService } from '../../services/tickets.service';
import { LeftPaddingPipe } from '../../../../libs/pipes/left-padding.pipe';
import { StaffService } from '../../../../libs/services/staff.service';

@Component({
	selector: 'oryo-create-ticket',
	standalone: true,
	imports: [
		HlmButtonDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmLabelDirective,

		BrnRadioGroupComponent,
		BrnRadioComponent,
		HlmRadioIndicatorComponent,
		HlmRadioDirective,
		HlmRadioGroupDirective,

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
		LeftPaddingPipe
	],
	providers: [provideIcons({ lucidePlus })],
	templateUrl: './create-ticket.component.html',
	styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {
	readonly TicketsStatuses = TicketItemStatus;
	readonly TicketsPriorities = TicketItemPriority;

	// declare input and outputs
	ticketCreated = output();

	// injects
	_fb = inject(FormBuilder);
	_ticketsService = inject(TicketsService);
	staffList = inject(StaffService).staffList;

	// component variables
	openCreateTicketForm = signal(false);
	isCreatingTicket = signal<boolean>(false);

	createTicketForm = this._fb.nonNullable.group({
		// customer details
		reporterName: this._fb.nonNullable.control('', Validators.required),
		reporterEmail: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		reporterCompany: this._fb.nonNullable.control('', Validators.required),

		// issue details
		status: this._fb.nonNullable.control(this.TicketsStatuses.OPEN, Validators.required),
		priority: this._fb.nonNullable.control(this.TicketsPriorities.HIGH, Validators.required),

		subject: this._fb.nonNullable.control('', Validators.required),
		category: this._fb.nonNullable.control('', Validators.required),
		description: this._fb.nonNullable.control('', Validators.required),
		assignee: this._fb.nonNullable.control<number | undefined>(undefined, Validators.required),
	});

	onSubmit() {
		if (this.createTicketForm.invalid) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-internal-create-ticket-form"
			})
		}

		const payload: CreateTicketItemPayload = {
			reporterName: this.createTicketForm.controls.reporterName.value,
			reporterEmail: this.createTicketForm.controls.reporterEmail.value,
			reporterCompany: this.createTicketForm.controls.reporterCompany.value,
			status: this.createTicketForm.controls.status.value,
			priority: this.createTicketForm.controls.priority.value,
			subject: this.createTicketForm.controls.subject.value,
			description: this.createTicketForm.controls.description.value,
			category: this.createTicketForm.controls.category.value,
			assignee: this.createTicketForm.controls.assignee.value,
		}

		this.isCreatingTicket.set(true);
		this._ticketsService.createTicket(payload).subscribe({
			next: (res) => {
				this.ticketCreated.emit();
				this.isCreatingTicket.set(false);
				this.openCreateTicketForm.set(false);
				toast.success("Ticket created successfully", {
					id: "create-ticket-form-success"
				});
			},
			error: (err) => {
				this.isCreatingTicket.set(false);
				toast.error("Error submitting ticket", {id: "internal-create-ticket-error"});
			}
		})
	}

}
