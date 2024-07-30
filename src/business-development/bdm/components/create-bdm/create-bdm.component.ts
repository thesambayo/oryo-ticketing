import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { LeftPaddingPipe } from '../../../../libs/pipes/left-padding.pipe';
import { HlmButtonDirective } from '../../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmDialogContentComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-content.component';
import { HlmDialogDescriptionDirective } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-description.directive';
import { HlmDialogFooterComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-footer.component';
import { HlmDialogHeaderComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogTitleDirective } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-title.directive';
import { HlmDialogComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.component';
import { HlmIconComponent } from '../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../../../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmRadioGroupDirective } from '../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-group.directive';
import { HlmRadioIndicatorComponent } from '../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-indicator.component';
import { HlmRadioDirective } from '../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio.directive';
import { toast } from 'ngx-sonner';
import { TicketsService } from '../../../../help-desk/ticketing/services/tickets.service';
<<<<<<< HEAD
import { EmailService } from '../../../../libs/services/email.service';
import {  TicketItemStatus, TicketItemPriority, TicketItem, CreateItemPayload } from '../../models/bdm-item';
=======
import {  CreateItemPayload } from '../../models/bdm-item';
>>>>>>> origin/main
import { Router } from '@angular/router';

@Component({
  selector: 'oryo-create-bdm',
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
  templateUrl: './create-bdm.component.html',
  styleUrl: './create-bdm.component.css'
})
export class CreateBdmComponent {
	// declare input and outputs
	ticketCreated = output();

	// injects
	_fb = inject(FormBuilder);
<<<<<<< HEAD
	_emailService = inject(EmailService);
=======
>>>>>>> origin/main
	_ticketsService = inject(TicketsService);
  _routes = inject(Router)

	// component variables
	openCreateCompanyForm = signal(false);
	openCreateBranchForm = signal(false);
	isCreatingTicket = signal<boolean>(false);

	createCompantForm = this._fb.nonNullable.group({
		// customer details
		name: this._fb.nonNullable.control('', Validators.required),
		email: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		// branch: this._fb.nonNullable.control('', Validators.required),
		phone: this._fb.nonNullable.control('', Validators.required),
		location: this._fb.nonNullable.control('', Validators.required),
		pto: this._fb.nonNullable.control('', Validators.required),
<<<<<<< HEAD

		// // issue details
		// status: this._fb.nonNullable.control('OPEN', Validators.required),
		// priority: this._fb.nonNullable.control('HIGH', Validators.required),

		// subject: this._fb.nonNullable.control('', Validators.required),
		// category: this._fb.nonNullable.control('', Validators.required),
		// description: this._fb.nonNullable.control('', Validators.required),
		// attachments: this._fb.nonNullable.control<string[]>([]),
		// assignee: this._fb.nonNullable.control(""),
=======
>>>>>>> origin/main
	});

	// handleOpenCreateFormDialog(state: BrnDialogState) {
	// 	if (state === 'closed') {
	// 		this.openCreateTicketForm.set(false);
	// 	}
	// }

	onSubmit() {
		if (this.createCompantForm.invalid) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-internal-create-ticket-form"
			})
		}

		const payload: CreateItemPayload = {
			name: this.createCompantForm.controls.name.value,
			email: this.createCompantForm.controls.email.value,
			// branch: this.createCompantForm.controls.branch.value,
			phone: this.createCompantForm.controls.phone.value,
			location: this.createCompantForm.controls.location.value,
			pto: this.createCompantForm.controls.pto.value,
		}

		this.isCreatingTicket.set(true);
    if (payload) {
      toast.success("Success in creation", {
				id: "valid-success"
			})

				this.ticketCreated.emit();
				this.isCreatingTicket.set(false);
				this.openCreateBranchForm.set(false);
        this.openCreateCompanyForm.set(false)
        this._routes.navigate(['business-development', 'view-bdm'])
      
    }
		// this._ticketsService.createTicket(payload).subscribe({
		// 	next: (res) => {
		// 		this.ticketCreated.emit();
		// 		this.isCreatingTicket.set(false);
		// 		this.openCreateTicketForm.set(false);
		// 		this.sendEmail(res.data);
		// 		toast.success("Ticket created successfully", {
		// 			id: "create-ticket-form-success"
		// 		});
		// 	},
		// 	error: (err) => {
		// 		this.isCreatingTicket.set(false);
		// 		console.log(err);
		// 	}
		// })
	}

	

	showSuccessToast() {
		toast.success("Email sent to client", {
			id: "create-ticket-form-email-success",
		});
	}

}
