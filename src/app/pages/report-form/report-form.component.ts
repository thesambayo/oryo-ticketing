import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { toast } from 'ngx-sonner';
import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmInputDirective } from '../../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmToasterComponent } from '../../../libs/ui/ui-sonner-helm/src/lib/hlm-toaster.component';
import { CommonModule } from '@angular/common';
import { EmailFields, EmailService } from '../../services/email.service';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmToasterComponent,
    HlmInputDirective,
    HlmLabelDirective,
    BrnSelectImports,
    HlmSelectImports,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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
    toast.success("Ticket has been created successfully");
  }

  showErrorToast() {
    toast.error("Something went wrong. We are working on it");
  }
}
