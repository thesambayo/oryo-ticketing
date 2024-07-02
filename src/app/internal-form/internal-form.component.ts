import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toast } from 'ngx-sonner';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { EmailFields, EmailService } from '../services/email.service';

enum InternalFormSteps {
  CustomerDetails,
  IssueDetails,
  TicketDetails
}

@Component({
  selector: 'oryo-internal-form',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    BrnSelectImports,
    HlmSelectImports,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './internal-form.component.html',
  styleUrl: './internal-form.component.css'
})
export class InternalFormComponent {
  _emailService = inject(EmailService);
  isSendingEmail = false;
  currentStep = InternalFormSteps.CustomerDetails;
  InternalFormSteps = InternalFormSteps;


  reportForm = new FormGroup({
    // customer details
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),

    // issue details
    subject: new FormControl('', Validators.required),
    issueType: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    attachments: new FormControl(''),

    // ticket details
    ticketId: new FormControl(this._emailService.generateTicketId(), Validators.required),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  get currentStepValidity(): boolean {
    if (this.currentStep === InternalFormSteps.CustomerDetails) {
      return this.reportForm.controls.name.valid &&
        this.reportForm.controls.email.valid &&
        this.reportForm.controls.company.valid &&
        this.reportForm.controls.phone.valid;
    }
    if (this.currentStep === InternalFormSteps.IssueDetails) {
      return this.reportForm.controls.subject.valid &&
        this.reportForm.controls.description.valid &&
        this.reportForm.controls.issueType.valid &&
        this.reportForm.controls.attachments.valid;
    }
    return this.reportForm.valid;

  }

  handlePreviousStep() {
    this.currentStep--;
  }

  handleNextStep() {
    if (this.currentStep === InternalFormSteps.TicketDetails) return;
    this.currentStep++;
  }

  resetFormValues() {
    this.reportForm.reset();
    this.reportForm.patchValue({
      ticketId: this._emailService.generateTicketId()
    })

  }

  onSubmit() {
    console.log(this.reportForm.value)
    this.showSuccessToast();
    this.resetFormValues();
    this.currentStep = InternalFormSteps.CustomerDetails;
  }

  showSuccessToast() {
    this.reportForm.reset();
    toast.info("Ticket is being processed");
  }

  showErrorToast() {
    toast.info("Ticket is being processed");
  }
}
