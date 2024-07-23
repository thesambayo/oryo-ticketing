import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnRadioComponent, BrnRadioGroupComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioDirective, HlmRadioGroupDirective, HlmRadioIndicatorComponent } from '@spartan-ng/ui-radiogroup-helm';
import { TicketsService } from '../ticketing/services/tickets.service';
import { CreateTicketItemPayload, TicketItem } from '../ticketing/models/ticket-item';
import { EmailService } from '../../libs/services/email.service';

@Component({
	selector: 'oryo-report-form',
	standalone: true,
	imports: [
		HlmButtonDirective,
		HlmInputDirective,
		HlmLabelDirective,
		BrnSelectImports,
		HlmSelectImports,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrnRadioGroupComponent,
		BrnRadioComponent,
		HlmRadioIndicatorComponent,
		HlmRadioDirective,
		HlmRadioGroupDirective,
	],
	templateUrl: './report-form.component.html',
	styleUrl: './report-form.component.css'
})


export class ReportFormComponent {

	_emailService = inject(EmailService);
	_ticketsService = inject(TicketsService);

	isSendingEmail = false;

	reportForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		company: new FormControl('', Validators.required),
		subject: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required),
	});

	onSubmit() {
		const payload: CreateTicketItemPayload = {
			reporterName: this.reportForm.value.name!,
			reporterEmail: this.reportForm.value.email!,
			reporterCompany: this.reportForm.value.company!,
			subject: this.reportForm.value.subject!,
			description: this.reportForm.value.description!,
			category: "PROBLEM_MANAGEMENT",
			assignee: 1
		};
		this.isSendingEmail = true;
		this._ticketsService.createTicket(payload).subscribe({
			next: (res) => {
				this.isSendingEmail = false;
				this.reportForm.reset();
				toast.info("Ticket is being processed", {id: "report form"});
			},
			error: () => {
				this.isSendingEmail = false;
				toast.error("Error submitting ticket", {id: "report form error"});
			}
		})
	}
}
