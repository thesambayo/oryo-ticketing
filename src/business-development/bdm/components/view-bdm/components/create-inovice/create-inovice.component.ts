import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
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
import { toast } from 'ngx-sonner';
import { TicketsService } from '../../../../../../help-desk/ticketing/services/tickets.service';
import { CreateBudgetPayload } from '../../../../models/bdm-item';
import { OnlyNumbersDirective } from '../directives/only-numbers.directive';

@Component({
  selector: 'oryo-create-inovice',
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
		LeftPaddingPipe,
    OnlyNumbersDirective
	],
	providers: [provideIcons({ lucidePlus })],
  templateUrl: './create-inovice.component.html',
  styleUrl: './create-inovice.component.css'
})
export class CreateInoviceComponent {
	// declare input and outputs
	ticketCreated = output();

  budget: any
  target: any
  payableAmount: any;
  leftAmount: any;
  actualTarget: any;

	// injects
	_fb = inject(FormBuilder);
	_ticketsService = inject(TicketsService);

	// component variables
	openCreateCompanyForm = signal(false);
	openCreateBranchForm = signal(false);
	isCreatingTicket = signal<boolean>(false);
  

	createCompantForm = this._fb.nonNullable.group({
		// customer details
		budget: this._fb.nonNullable.control('', Validators.required),
		projectValue: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		negotationValue: this._fb.nonNullable.control('', [Validators.required]),
		paymentValue: this._fb.nonNullable.control('', [Validators.required]),
		oustandingBalance: this._fb.nonNullable.control('', [Validators.required]),
		generatedInvoice: this._fb.nonNullable.control('', [Validators.required]),
	});

  ontxtBudget(e: any) {
    this.budget = this.formattedNumber(e.target.value);
    console.log(this.budget);
    if (this.target) {
      this.target = this.budget - this.target;
    }
  }

  formattedNumber(inputNumber: any) {
    return inputNumber.replace(/[.,]/g, '');
  }
  ontxtTarget(e: any) {
    let target = this.formattedNumber(e.target.value);
    this.actualTarget = target;
    if (this.budget) {
      this.target = this.budget - target;
    }
    // this.target = this.budget - target
  }
  ontxtPercentage(e: any) {
    let num = this.formattedNumber(e.target.value);
    let amount = this.actualTarget * (num / 100);
    this.payableAmount = amount;
    this.leftAmount = this.actualTarget - amount;
    // Create a simulated event object for handleInput
    // const amountEvent = {
    //   target: {
    //     value: this.leftAmount.toString(),
    //     name: 'oustanding_balance', // Replace with the desired name
    //   },
    // };
    // const payableEvent = {
    //   target: {
    //     value: this.payableAmount.toString(),
    //     name: 'generated_invoice', // Replace with the desired name
    //   },
    // };
  }

	onSubmit() {
		if (this.createCompantForm.invalid) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-internal-create-ticket-form"
			})
		}
    

		const payload: CreateBudgetPayload = {
			budget: this.createCompantForm.controls.budget.value,
			projectValue: this.createCompantForm.controls.projectValue.value,
			negotationValue: this.createCompantForm.controls.negotationValue.value,
			paymentValue: this.createCompantForm.controls.paymentValue.value,
			oustandingBalance: this.createCompantForm.controls.oustandingBalance.value,
			generatedInvoice: this.createCompantForm.controls.generatedInvoice.value,
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
