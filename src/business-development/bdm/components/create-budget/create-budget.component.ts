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
import { StaffService } from '../../../../libs/services/staff.service';
import { OnlyNumbersDirective } from '../view-bdm/components/directives/only-numbers.directive';
import { Department, Staff } from '../../../../help-desk/core/models/staff';
import { pipe, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BudgetService } from '../services/budget.service';

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
    OnlyNumbersDirective,

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
  _staffService = inject(StaffService);
  _budgetService = inject(BudgetService)

  _dialogRef = inject<BrnDialogRef<CreateUserBudgetPayload>>(BrnDialogRef);

  bdmStaff = this._staffService.bdmStaff;
//   bdmStaff$ = this._staffService.getStaff(Department.BUSINESS_DEVELOPMENT);
  isCreating = signal<boolean>(false);
  retrievedPayload = JSON.parse(localStorage.getItem('userBudget') || '{}');



  ngOnInit() {}
//   console.log(this.bdmStaff())
// 	{{bdmStaff$ | async}}

  createCompantForm = this._fb.nonNullable.group({
    // customer details
    staffId: this._fb.nonNullable.control(0, Validators.required),
    budget: this._fb.nonNullable.control('', [Validators.required]),
    startDate: this._fb.nonNullable.control('', [Validators.required]),
    endDate: this._fb.nonNullable.control('', [Validators.required]),
  });

//   getStaff() {

// 	const 
//   }

removeCommas(numberString: string) {
    return numberString.replace(/,/g, '');
}


  onSubmit() {
    if (this.createCompantForm.invalid) {
      toast.error('Form is invalid. All fields are should be filled', {
        id: 'invalid-internal-create-ticket-form',
      });
    }

    const payload: CreateUserBudgetPayload = {
      staffId: this.createCompantForm.controls.staffId.value,
      amount: parseFloat(this.removeCommas(this.createCompantForm.controls.budget.value)),
	  createdBy: this._budgetService.getUser()|| 0,
      startDate: new Date(this.createCompantForm.controls.startDate.value).toISOString(),
      endDate: new Date(this.createCompantForm.controls.endDate.value).toISOString(),
    };
	console.log(payload);

	

    this.isCreating.set(true);

    this._budgetService.createBudget(payload).subscribe({
    	next: (res) => {
    		toast.success("Budget created successfully", {
    			id: "create-budget-form-success"
    		});
			this._dialogRef.close();
			// Reset the creating state
			this.isCreating.set(false);
    	},
    	error: (err) => {
			// Reset the creating state
			this.isCreating.set(false);
			toast.error("Error submitting Budget", {id: "create-budget-error"});
    		console.log(err);
    	}
    })
  }
}
