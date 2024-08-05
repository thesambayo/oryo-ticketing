import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import {
  BrnDialogTriggerDirective,
  BrnDialogContentDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  BrnRadioGroupComponent,
  BrnRadioComponent,
} from '@spartan-ng/ui-radiogroup-brain';
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
import { CreateActivityPayload } from '../../../../models/bdm-item';
import { AuthService } from '../../../../../../libs/services/auth.service';

@Component({
  selector: 'oryo-create-activity',
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
    FormsModule,
    LeftPaddingPipe,
  ],
  providers: [provideIcons({ lucidePlus })],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.css',
})
export class CreateActivityComponent {
  // declare input and outputs
  ticketCreated = output();

  // injects
  _fb = inject(FormBuilder);
  _ticketsService = inject(TicketsService);
  fooof: any;

  // component variables
  openCreateCompanyForm = signal(false);
  openCreateBranchForm = signal(false);
  isCreatingTicket = signal<boolean>(false);
  staffName = inject(AuthService).getLoggedInStaff()?.staff.name;

  createForm = this._fb.nonNullable.group({
    description: this._fb.nonNullable.control('', Validators.required),
  });

  activeTab: string = 'Tab1';

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  textInput(e: any){
	    console.log(e.target.value);
		this.fooof = e.target.value
  }

  onSubmit() {
    // if (this.createForm.invalid) {
    //   toast.error('Form is invalid. All fields are should be filleds', {
    //     id: 'invalid-internal-create-ticket-form',
    //   });
    // }
    // Get the current date and time as an ISO string
    const newItem = {
      id: 1, // Replace with the actual ID or data you want
      name: this.staffName,
      description: this.fooof,
      created_by: '', // Add creator's information here if available
      updated_by: '', // Add updater's information if available
      created_at: new Date().toISOString(), // Set the current date and time
      updated_at: '', // Can be set when the object is updated
    };

	console.log(newItem);
	

    // Retrieve the existing array from localStorage or initialize it if it doesn't exist
    let itemsArray = JSON.parse(localStorage.getItem('items') || '[]');

    // Push the new item into the array
    itemsArray.push(newItem);

    // Convert the updated array to a JSON string
    const itemsArrayJson = JSON.stringify(itemsArray);

    // Save the updated array back to localStorage
    localStorage.setItem('items', itemsArrayJson);

    // Notify the user of success and manage other state
    // this.isCreating.set(true);

    if (newItem) {
      toast.success('Success in creation', {
        id: 'valid-success',
      });

      this.ticketCreated.emit();
      this.isCreatingTicket.set(false);
      this.openCreateCompanyForm.set(false);
	  this.createForm.reset();
    }
  }

  showSuccessToast() {
    toast.success('Email sent to client', {
      id: 'create-ticket-form-email-success',
    });
  }
}
