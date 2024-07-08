import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { EmailFields, EmailService } from '../services/email.service';
import { BrnRadioComponent, BrnRadioGroupComponent } from '@spartan-ng/ui-radiogroup-brain';
import { HlmRadioDirective, HlmRadioGroupDirective, HlmRadioIndicatorComponent } from '@spartan-ng/ui-radiogroup-helm';

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
  isSendingEmail = false;

  reportForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', Validators.required),
    issueType: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  onSubmit() {
    const emailFields: EmailFields = {
      name: this.reportForm.value.name!,
      email: this.reportForm.value.email!,
      company: this.reportForm.value.company!,
      issueType: this.reportForm.value.issueType!,
      description: this.reportForm.value.description!
    };
    this.isSendingEmail = true;
    this._emailService.sendEmail(emailFields).subscribe({
      next: data => {
        this.isSendingEmail = false;
        this.showSuccessToast();
      },
      error: () => {
        this.isSendingEmail = false;
        this.showErrorToast();
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
