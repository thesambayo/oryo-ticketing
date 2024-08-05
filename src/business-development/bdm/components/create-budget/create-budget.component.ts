import { Component, inject, signal } from '@angular/core';
import { HlmButtonDirective } from '../../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmDialogDescriptionDirective } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-description.directive';
import { HlmDialogHeaderComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogTitleDirective } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-title.directive';
import { HlmIconComponent } from '../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmTableComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmTdComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-td.component';
import { HlmThComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTrowComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { HlmInputDirective } from '../../../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { Budget, CreateUserBudgetPayload } from '../../models/bdm-item';
import { toast } from 'ngx-sonner';
import { BrnDialogRef } from '@spartan-ng/ui-dialog-brain';
import { StaffService } from '../../../../help-desk/core/services/staff.service';

@Component({
  selector: 'oryo-create-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmLabelDirective,

    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './create-budget.component.html',
  styleUrl: './create-budget.component.css',
})
export class CreateBudgetComponent {
  _fb = inject(FormBuilder);
  // _ticketsService = inject(TicketsService);
  _routes = inject(Router);

  _dialogRef = inject<BrnDialogRef<CreateUserBudgetPayload>>(BrnDialogRef);

  isCreating = signal<boolean>(false);
  staffList = inject(StaffService).staffList;
  retrievedPayload = JSON.parse(localStorage.getItem('userBudget') || '{}');

  _user = [
    { id: 1, name: 'Jide' },
    { id: 2, name: 'Samuel' },
    { id: 2, name: 'BJ' },
    { id: 2, name: 'Victor' },
  ];

  createCompantForm = this._fb.nonNullable.group({
    // customer details
    staffId: this._fb.nonNullable.control(0, Validators.required),
    budget: this._fb.nonNullable.control('', [Validators.required]),
    startDate: this._fb.nonNullable.control('', [Validators.required]),
    endDate: this._fb.nonNullable.control('', [Validators.required]),
  });

  onSubmit() {
    if (this.createCompantForm.invalid) {
      toast.error('Form is invalid. All fields are should be filled', {
        id: 'invalid-internal-create-ticket-form',
      });
    }

    const payload: CreateUserBudgetPayload = {
      staffId: this.createCompantForm.controls.staffId.value,
      budget: this.createCompantForm.controls.budget.value,
      startDate: this.createCompantForm.controls.startDate.value,
      endDate: this.createCompantForm.controls.endDate.value,
    };

    this.isCreating.set(true);
    // Retrieve the existing array from localStorage or initialize it if it doesn't exist
    let budgetsArray = JSON.parse(localStorage.getItem('userBudget') || '[]');

    // Add the new payload to the array
    budgetsArray.push(payload);

    // Convert the array back to a JSON string
    const budgetsArrayJson = JSON.stringify(budgetsArray);

    // Save the updated array back to localStorage
    localStorage.setItem('userBudget', budgetsArrayJson);

    // Notify the user of success and close the dialog
    this.isCreating.set(true);

    if (payload) {
      toast.success('Success in creation', {
        id: 'valid-success',
      });

      this._dialogRef.close();

      // Reset the creating state
      this.isCreating.set(false);
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
}
