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
import { Lead, LeadStatus } from '../../../../models/bdm-item';

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
	_ticketsService = inject(TicketsService);

	// component variables
	openCreateCompanyForm = signal(false);
	openCreateBranchForm = signal(false);
	isCreatingTicket = signal<boolean>(false);

	createCompantForm = this._fb.nonNullable.group({
		// customer details
		name: this._fb.nonNullable.control('', Validators.required),
		email: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		customerName: this._fb.nonNullable.control('', [Validators.required]),
		phone: this._fb.nonNullable.control('', [Validators.required]),
		location: this._fb.nonNullable.control('', [Validators.required]),
		pto: this._fb.nonNullable.control('', [Validators.required]),
	});


	onSubmit() {
		if (this.createCompantForm.invalid) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-internal-create-ticket-form"
			})
		}

		const payload: Lead = {
			name: this.createCompantForm.controls.name.value,
			email: this.createCompantForm.controls.email.value,
			customerName: this.createCompantForm.controls.customerName.value,
			phone: this.createCompantForm.controls.phone.value,
			location: this.createCompantForm.controls.location.value,
			product_offered: this.createCompantForm.controls.pto.value,
			id: 0,
			status: LeadStatus.KIV,
			created_by: '',
			updated_by: '',
			created_at: '',
			updated_at: ''
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
	}


	showSuccessToast() {
		toast.success("Email sent to client", {
			id: "create-ticket-form-email-success",
		});
	}


}
