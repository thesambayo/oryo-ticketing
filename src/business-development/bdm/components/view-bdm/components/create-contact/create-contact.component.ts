import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { toast } from 'ngx-sonner';
import { TicketsService } from '../../../../../../help-desk/ticketing/services/tickets.service';
import { LeftPaddingPipe } from '../../../../../../libs/pipes/left-padding.pipe';
<<<<<<< HEAD
import { EmailService } from '../../../../../../libs/services/email.service';
=======
>>>>>>> origin/main
import { HlmButtonDirective } from '../../../../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmDialogContentComponent } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-content.component';
import { HlmDialogDescriptionDirective } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-description.directive';
import { HlmDialogFooterComponent } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-footer.component';
import { HlmDialogHeaderComponent } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogTitleDirective } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-title.directive';
import { HlmDialogComponent } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.component';
import { HlmIconComponent } from '../../../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../../../../../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../../../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmRadioGroupDirective } from '../../../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-group.directive';
import { HlmRadioIndicatorComponent } from '../../../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-indicator.component';
import { HlmRadioDirective } from '../../../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio.directive';
<<<<<<< HEAD
import { CreateItemPayload, CreateViewPayload } from '../../../../models/bdm-item';
=======
import { CreateViewPayload } from '../../../../models/bdm-item';
>>>>>>> origin/main

@Component({
  selector: 'oryo-create-contact',
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
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent {
	// declare input and outputs
	ticketCreated = output();

	// injects
	_fb = inject(FormBuilder);
<<<<<<< HEAD
	_emailService = inject(EmailService);
=======
>>>>>>> origin/main
	_ticketsService = inject(TicketsService);

	// component variables
	openCreateCompanyForm = signal(false);
	openCreateBranchForm = signal(false);
	isCreatingTicket = signal<boolean>(false);

	createCompantForm = this._fb.nonNullable.group({
		// customer details
		name: this._fb.nonNullable.control('', Validators.required),
		email: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		branch: this._fb.nonNullable.control('', [Validators.required]),
		phone: this._fb.nonNullable.control('', [Validators.required]),
		location: this._fb.nonNullable.control('', [Validators.required]),
		pto: this._fb.nonNullable.control('', [Validators.required]),
<<<<<<< HEAD
		// reporterCompany: this._fb.nonNullable.control('', Validators.required),

		// // issue details
		// status: this._fb.nonNullable.control('OPEN', Validators.required),
		// priority: this._fb.nonNullable.control('HIGH', Validators.required),

		// subject: this._fb.nonNullable.control('', Validators.required),
		// category: this._fb.nonNullable.control('', Validators.required),
		// description: this._fb.nonNullable.control('', Validators.required),
		// attachments: this._fb.nonNullable.control<string[]>([]),
		// assignee: this._fb.nonNullable.control(""),
	});

	// handleOpenCreateFormDialog(state: BrnDialogState) {
	// 	if (state === 'closed') {
	// 		this.openCreateTicketForm.set(false);
	// 	}
	// }
=======
	});

>>>>>>> origin/main

	onSubmit() {
		if (this.createCompantForm.invalid) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-internal-create-ticket-form"
			})
		}

		const payload: CreateViewPayload = {
			name: this.createCompantForm.controls.name.value,
			email: this.createCompantForm.controls.email.value,
			branch: this.createCompantForm.controls.branch.value,
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
      
    }
<<<<<<< HEAD
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
=======
>>>>>>> origin/main
	}


	showSuccessToast() {
		toast.success("Email sent to client", {
			id: "create-ticket-form-email-success",
		});
	}


}
