import { Component, Input, inject, signal } from '@angular/core';
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
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
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
import { CreateItemPayload } from '../../models/bdm-item';
import { DecimalPipe, Location } from '@angular/common';
import { OnlyNumbersDirective } from './components/directives/only-numbers.directive';

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
    OnlyNumbersDirective, DecimalPipe,
    HlmSkeletonComponent
  ],
  providers: [
    provideIcons({
      lucideArrowLeftFromLine,
    }),
  ],
  templateUrl: './view-bdm.component.html',
  styleUrl: './view-bdm.component.css',
})
export class ViewBdmComponent {
  getId = Input();
  _loading = signal<boolean>(false);
	isCreating = signal<boolean>(false);
  isEditing = signal<boolean>(false);

  budget: any;
  target: any;
  payableAmount: any;
  leftAmount: any;
  actualTarget: any;

  bdm: { [key: string]: string } = {};

	// injects
	_fb = inject(FormBuilder);
  _location = inject(Location)
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
  protected _activity: any[] =[]

  ngOnInit(): void {
    this._loading.set(true)
    setTimeout(() => {
      this._loading.set(false);
      this._activity= [
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

  createCompantForm = this._fb.nonNullable.group({
		// customer details
		name: this._fb.nonNullable.control('', Validators.required),
		email: this._fb.nonNullable.control('', [Validators.required, Validators.email]),
		// branch: this._fb.nonNullable.control('', Validators.required),
		phone: this._fb.nonNullable.control('', Validators.required),
		location: this._fb.nonNullable.control('', Validators.required),
		pto: this._fb.nonNullable.control('', Validators.required),

		// // issue details
		// status: this._fb.nonNullable.control('OPEN', Validators.required),
		// priority: this._fb.nonNullable.control('HIGH', Validators.required),

		// subject: this._fb.nonNullable.control('', Validators.required),
		// category: this._fb.nonNullable.control('', Validators.required),
		// description: this._fb.nonNullable.control('', Validators.required),
		// attachments: this._fb.nonNullable.control<string[]>([]),
		// assignee: this._fb.nonNullable.control(""),
	});

  onToggle() {
    if (this.isEditing() === true) {
      this.isEditing.set(false)
      return
    }
    this.isEditing.set(true)
  }

  goBack() {
    this._location.back()
  }

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

  handleInput(event: any, type?:any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const keyPressed = inputElement.name;

    this.bdm[keyPressed] = inputValue;
    console.log(this.bdm);
    // Use the DecimalPipe to format the value
  }


  onSubmit() {
      if (this.createCompantForm.invalid) {
        toast.error("Form is invalid. All fields are should be filled", {
          id: "invalid-internal-create-ticket-form"
        })
      }
  
      const payload: CreateItemPayload = {
        name: this.createCompantForm.controls.name.value,
        email: this.createCompantForm.controls.email.value,
        // branch: this.createCompantForm.controls.branch.value,
        phone: this.createCompantForm.controls.phone.value,
        location: this.createCompantForm.controls.location.value,
        pto: this.createCompantForm.controls.pto.value,
      }
  
      this.isCreating.set(true);
      if (payload) {
        toast.success("Success in creation", {
          id: "valid-success"
        })
  
          this.isCreating.set(false);
          // this._routes.navigate(['business-development', 'view-bdm'])
        
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
