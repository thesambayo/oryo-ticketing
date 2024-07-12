import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toast } from 'ngx-sonner';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnRadioComponent, BrnRadioGroupComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioDirective, HlmRadioGroupDirective, HlmRadioIndicatorComponent } from '@spartan-ng/ui-radiogroup-helm';
import { EmailFields, EmailService } from '../../libs/services/email.service';

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
    ReactiveFormsModule,
    BrnRadioGroupComponent,
    BrnRadioComponent,
    HlmRadioIndicatorComponent,
    HlmRadioDirective,
    HlmRadioGroupDirective,
  ],
  templateUrl: './internal-form.component.html',
  styleUrl: './internal-form.component.css'
})
export class InternalFormComponent {
  _emailService = inject(EmailService);
  isSendingEmail = false;


  reportForm = new FormGroup({
    // customer details
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),

    // issue details
    // subject: new FormControl('', Validators.required),
    issueType: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    attachments: new FormControl(''),

    // ticket details
    status: new FormControl('open', Validators.required),
    priority: new FormControl('high', Validators.required),
  });

  resetFormValues() {
    this.reportForm.reset();

  }

  onSubmit() {
    this.isSendingEmail = true;
    this._emailService.sendEmail(this.reportForm.value as EmailFields).subscribe({
      next: (_res) => {
        this.showSuccessToast();
        this.resetFormValues();
        this.isSendingEmail = false;
      },
      error: (_err) => {
        this.showSuccessToast();
        this.resetFormValues();
        this.isSendingEmail = false;
      }
    });
  }

  showSuccessToast() {
    this.reportForm.reset();
    toast.info("Ticket is being processed");
  }

  showErrorToast() {
    toast.info("Ticket is being processed");
  }
}
