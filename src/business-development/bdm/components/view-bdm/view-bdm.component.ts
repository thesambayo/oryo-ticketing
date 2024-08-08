import {
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { HlmCaptionComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-caption.component';
import { HlmTableComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmTdComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-td.component';
import { HlmThComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTrowComponent } from '../../../../libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { CreateInoviceComponent } from './components/create-inovice/create-inovice.component';
import { HlmSkeletonComponent } from '../../../../libs/ui/ui-skeleton-helm/src/lib/hlm-skeleton.component';
import { HlmIconComponent } from '../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftFromLine } from '@ng-icons/lucide';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '../../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmInputDirective } from '../../../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
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
import { HlmDialogContentComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-content.component';
import { HlmDialogDescriptionDirective } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-description.directive';
import { HlmDialogFooterComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-footer.component';
import { HlmDialogHeaderComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogTitleDirective } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-title.directive';
import { HlmDialogComponent } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.component';
import { HlmRadioGroupDirective } from '../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-group.directive';
import { HlmRadioIndicatorComponent } from '../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-indicator.component';
import { HlmRadioDirective } from '../../../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio.directive';
import { toast } from 'ngx-sonner';
import { DatePipe, DecimalPipe, Location } from '@angular/common';
import { OnlyNumbersDirective } from './components/directives/only-numbers.directive';
import {
  CreateActivityPayload,
  Lead,
  LeadStatus,
  Won,
} from '../../models/bdm-item';
import { StaffService } from '../../../../libs/services/staff.service';
import { HlmtDialogService } from '../services/hlm-dialog.service';
import { AuthService } from '../../../../libs/services/auth.service';
import { PrintInoviceComponent } from './components/print-inovice/print-inovice.component';
import { HlmDialogService } from '../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.service';

@Component({
  selector: 'oryo-view-bdm',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmLabelDirective,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    CreateContactComponent,
    CreateActivityComponent,
    CreateInoviceComponent,
    HlmIconComponent,
    NgIconComponent,
    BrnRadioGroupComponent,
    BrnRadioComponent,
    HlmRadioIndicatorComponent,
    HlmRadioDirective,
    HlmRadioGroupDirective,

    DatePipe,

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
    OnlyNumbersDirective,
    DecimalPipe,
    HlmSkeletonComponent,
  ],
  providers: [
    provideIcons({
      lucideArrowLeftFromLine,
    }),
  ],
  templateUrl: './view-bdm.component.html',
  styleUrl: './view-bdm.component.css',
})
export class ViewBdmComponent implements OnInit {
  getId = Input();
  _loading = signal<boolean>(false);
  isCreating = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  isEditingWon = signal<boolean>(false);
  isCreatingOpportunity = signal<boolean>(false);
  staffName = inject(AuthService).getLoggedInStaff()?.staff.name;
  retrievedPayload = JSON.parse(localStorage.getItem('userBudget') || '{}');
  storedItems = JSON.parse(localStorage.getItem('items') || '[]');

  budget: any;
  target: any;
  payableAmount: any;
  leftAmount: any;
  actualTarget: any;

  bdm: { [key: string]: string } = {};

  @ViewChild('onlyNumbersInput') onlyNumbersDirective!: OnlyNumbersDirective;

  // injects
  _fb = inject(FormBuilder);
  _location = inject(Location);
  _log = inject(HlmtDialogService);
  _hlmDialogService = inject(HlmDialogService);
  _staff = this._log.getRes();
  protected _invoices = [
    {
      name: 'Olumide',
      email: 'oekundayo@oryoltd.com',
      phoneNo: '23408187732178',
      Branch: 'Lekki',
      Location: 'Lekki Phase 1',
      productOffered: 'Fleet Managemnet',
    },
    {
      name: 'Dami',
      email: 'dOlawe@oryoltd.com',
      phoneNo: '23408187732178',
      Branch: 'Ijebu',
      Location: 'Ago-Iwoye',
      productOffered: 'Vision',
    },
    {
      name: 'Umar',
      email: 'umar@oryoltd.com',
      phoneNo: '23408187732178',
      Branch: 'VI',
      Location: 'Allen',
      productOffered: 'Fuel',
    },
    {
      name: 'Samuel',
      email: 'samuelAdebayo@oryoltd.com',
      phoneNo: '23408187732178',
      Branch: 'VI',
      Location: 'Allen',
      productOffered: 'Generator',
    },
  ];
  protected _activity: any[] = [];

  protected _won = [
    {
      id: 1,
      name: 'Close',
    },
    {
      id: 2,
      name: 'KIV',
    },
    {
      id: 3,
      name: 'Not Interested',
    },
    {
      id: 4,
      name: 'POC',
    },
    {
      id: 5,
      name: 'Project',
    },
  ];
  protected _productOffered = [
    {
      id: 1,
      name: 'Fleet Management',
    },
    {
      id: 2,
      name: 'Vision',
    },
    {
      id: 3,
      name: 'Electronic Control Module',
    },
    {
      id: 4,
      name: 'Fuel',
    },
  ];

  openInvoce() {
    this._hlmDialogService.open(PrintInoviceComponent, {
      contentClass: 'sm:!max-w-full overflow',
    });
  }

  ngOnInit(): void {
    console.log(this.retrievedPayload, this._staff);

    this._loading.set(true);
    setTimeout(() => {
      this._loading.set(false);
      this._activity = [
        {
          name: 'Olumide',
          email: 'oekundayo@oryoltd.com',
          phoneNo: '23408187732178',
          Branch: 'Lekki',
          Location: 'Lekki Phase 1',
          productOffered: 'Fleet Managemnet',
        },
        {
          name: 'Dami',
          email: 'dOlawe@oryoltd.com',
          phoneNo: '23408187732178',
          Branch: 'Ijebu',
          Location: 'Ago-Iwoye',
          productOffered: 'Vision',
        },
        {
          name: 'Umar',
          email: 'umar@oryoltd.com',
          phoneNo: '23408187732178',
          Branch: 'VI',
          Location: 'Allen',
          productOffered: 'Fuel',
        },
        {
          name: 'Samuel',
          email: 'samuelAdebayo@oryoltd.com',
          phoneNo: '23408187732178',
          Branch: 'VI',
          Location: 'Allen',
          productOffered: 'Generator',
        },
      ];
    }, 3000);
  }

  getChanges() {
    this._loading.set(true);
    setTimeout(() => {
      this._loading.set(false);

      this.storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    }, 3000);
  }

  createCompantForm = this._fb.nonNullable.group({
    // customer details
    name: this._fb.nonNullable.control('', Validators.required),
    email: this._fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    customerName: this._fb.nonNullable.control('', Validators.required),
    phone: this._fb.nonNullable.control('', Validators.required),
    location: this._fb.nonNullable.control('', Validators.required),
    pto: this._fb.nonNullable.control('', Validators.required),
  });

  createOpportunityForm = this._fb.nonNullable.group({
    // customer details
    // description: this._fb.nonNullable.control('', Validators.required),
    siteSurvey: this._fb.nonNullable.control(''),
    schematicDesigns: this._fb.nonNullable.control(''),
    technicalProposal: this._fb.nonNullable.control(''),
    commercials: this._fb.nonNullable.control(''),
    purchaseOrder: this._fb.nonNullable.control(''),
  });

  createWonForm = this._fb.nonNullable.group({
    // customer details
    won: this._fb.nonNullable.control(0, Validators.required),
  });
  onSubmitOpportunity() {
    if (this.createOpportunityForm.invalid) {
      toast.error('Form is invalid. All fields are should be filled', {
        id: 'invalid-internal-create-ticket-form',
      });
    }

    const payload = {
      won: this.createWonForm.controls.won.value,
    };

    this.isCreatingOpportunity.set(true);
    if (payload) {
      toast.success('Success in creation', {
        id: 'valid-success',
      });
    }
  }

  onToggle() {
    if (this.isEditing() === true) {
      this.isEditing.set(false);
      return;
    }
    this.isEditing.set(true);
  }
  onToggleWon() {
    if (this.isEditingWon() === true) {
      this.isEditingWon.set(false);
      return;
    }
    this.isEditingWon.set(true);
  }

  goBack() {
    this._location.back();
  }

  ontxtBudget(e: any) {
    this.budget = this.formattedNumber(e.target.value);
    console.log(this.budget);
    if (this.target) {
      this.target = this.budget - this.target;
    }
  }

  formattedNumber(inputNumber: any) {
    return inputNumber.replace(/,/g, '');
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

    // Format amounts to 2 decimal places
    this.payableAmount = parseFloat(amount.toFixed(2));
    this.leftAmount = parseFloat((this.actualTarget - amount).toFixed(2));
    // Create a simulated event object for handleInput
    const amountEvent = {
      target: {
        value: this.leftAmount.toString(),
        name: 'oustanding_balance', // Replace with the desired name
      },
    };
    const payableEvent = {
      target: {
        value: this.payableAmount.toString(),
        name: 'generated_invoice', // Replace with the desired name
      },
    };

    // Call handleInput with the event
    this.handleInput(amountEvent);

    // Call handleInput with the event
    this.handleInput(payableEvent);
  }

  handleInput(event: any, type?: any) {
    this.onlyNumbersDirective.formatOnKeyUp();
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const keyPressed = inputElement.name;

    this.bdm[keyPressed] = inputValue;
    console.log(this.bdm);
    // Use the DecimalPipe to format the value
  }

  onSubmit() {
    if (this.createCompantForm.invalid) {
      toast.error('Form is invalid. All fields are should be filled', {
        id: 'invalid-internal-create-ticket-form',
      });
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
      updated_at: '',
    };

    this.isCreating.set(true);
    if (payload) {
      toast.success('Success in creation', {
        id: 'valid-success',
      });

      this.isCreating.set(false);
    }
  }
  onSubmitWon() {
    // Get the current date and time as an ISO string
    const newItem = {
      id: 1, // Replace with the actual ID or data you want
      name: this.staffName,
      description: this.createWonForm.controls.won.value,
      created_by: '', // Add creator's information here if available
      updated_by: '', // Add updater's information if available
      created_at: new Date().toISOString(), // Set the current date and time
      updated_at: '', // Can be set when the object is updated
    };

    // Retrieve the existing array from localStorage or initialize it if it doesn't exist
    let itemsArray = JSON.parse(localStorage.getItem('items') || '[]');

    // Push the new item into the array
    itemsArray.push(newItem);

    // Convert the updated array to a JSON string
    const itemsArrayJson = JSON.stringify(itemsArray);

    // Save the updated array back to localStorage
    localStorage.setItem('items', itemsArrayJson);

    // Notify the user of success and manage other state
    this.isCreating.set(true);

    if (newItem) {
      toast.success('Item successfully added to the list.', {
        id: 'valid-success',
      });

      this.isCreating.set(false);
    }
  }
}
