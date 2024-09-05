import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogHeaderComponent, HlmDialogFooterComponent, HlmDialogTitleDirective, HlmDialogDescriptionDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioIndicatorComponent, HlmRadioDirective, HlmRadioGroupDirective } from '@spartan-ng/ui-radiogroup-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { toast } from 'ngx-sonner';
import { TicketItemStatus, TicketItemPriority, CreateTicketItemPayload } from '../../help-desk/ticketing/models/ticket-item';
import { TicketsService } from '../../help-desk/ticketing/services/tickets.service';
import { LeftPaddingPipe } from '../../libs/pipes/left-padding.pipe';
import { StaffService } from '../../libs/services/staff.service';

@Component({
  selector: 'oryo-add-staff',
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
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent {
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

	addStaffForm = this._fb.nonNullable.group({
		name: this._fb.nonNullable.control('', Validators.required),
		email: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		department: this._fb.nonNullable.control('', Validators.required),
	});

	onSubmit() {
		if (this.addStaffForm.invalid) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-add-staff-form"
			})
		}

		const payload: any = {
			name: this.addStaffForm.controls.name.value,
			email: this.addStaffForm.controls.email.value,
			department: this.addStaffForm.controls.department.value,
		}

		// this.isCreatingTicket.set(true);
		// this._ticketsService.createTicket(payload).subscribe({
		// 	next: (res) => {
		// 		this.ticketCreated.emit();
		// 		this.isCreatingTicket.set(false);
		// 		this.openCreateTicketForm.set(false);
		// 		toast.success("Ticket created successfully", {
		// 			id: "create-ticket-form-success"
		// 		});
		// 	},
		// 	error: (err) => {
		// 		this.isCreatingTicket.set(false);
		// 		toast.error("Error submitting ticket", {id: "internal-create-ticket-error"});
		// 	}
		// })
	}

}
