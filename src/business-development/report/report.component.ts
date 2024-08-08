import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnPopoverComponent, BrnPopoverTriggerDirective, BrnPopoverContentDirective, BrnPopoverCloseDirective } from '@spartan-ng/ui-popover-brain';
import { BrnRadioGroupComponent, BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { TicketPriorityDisplayPipe } from '../../help-desk/ticketing/pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../help-desk/ticketing/pipes/ticket-status-display.pipe';
import { LeftPaddingPipe } from '../../libs/pipes/left-padding.pipe';
import { HlmBadgeDirective } from '../../libs/ui/ui-badge-helm/src/lib/hlm-badge.directive';
import { HlmButtonDirective } from '../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCheckboxComponent } from '../../libs/ui/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { HlmDialogContentComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-content.component';
import { HlmDialogDescriptionDirective } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-description.directive';
import { HlmDialogFooterComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-footer.component';
import { HlmDialogHeaderComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-header.component';
import { HlmDialogTitleDirective } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog-title.directive';
import { HlmDialogComponent } from '../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.component';
import { HlmIconComponent } from '../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmPopoverCloseDirective } from '../../libs/ui/ui-popover-helm/src/lib/hlm-popover-close.directive';
import { HlmPopoverContentDirective } from '../../libs/ui/ui-popover-helm/src/lib/hlm-popover-content.directive';
import { HlmRadioGroupDirective } from '../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-group.directive';
import { HlmRadioIndicatorComponent } from '../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio-indicator.component';
import { HlmRadioDirective } from '../../libs/ui/ui-radiogroup-helm/src/lib/hlm-radio.directive';
import { HlmSpinnerComponent } from '../../libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { HlmCaptionComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-caption.component';
import { HlmTableComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmTdComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-td.component';
import { HlmThComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTrowComponent } from '../../libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { HlmSmallDirective } from '../../libs/ui/ui-typography-helm/src/lib/hlm-small.directive';
import { ViewBdmComponent } from '../bdm/components/view-bdm/view-bdm.component';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideSearch, lucideMoveHorizontal, lucidePlus, lucideChevronsUpDown, lucideFilter } from '@ng-icons/lucide';
import { Router } from '@angular/router';
import { getStatusVariant, Lead, LeadStatus, Report } from '../bdm/models/bdm-item';
import { PercentagePipe } from '../pipes/percentage.pipe';
import { StaffService } from '../../libs/services/staff.service';

@Component({
  selector: 'oryo-report',
  standalone: true,
  imports: [

    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmCheckboxComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    HlmBadgeDirective,
    DatePipe,
    LeftPaddingPipe,
    NgClass,
    TicketPriorityDisplayPipe,
    TicketStatusDisplayPipe,

    HlmMenuModule,
    BrnMenuTriggerDirective,
    DecimalPipe,
    PercentagePipe,

    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    HlmLabelDirective,

    BrnRadioGroupComponent,
    BrnRadioComponent,
    HlmRadioIndicatorComponent,
    HlmRadioDirective,
    HlmRadioGroupDirective,
    HlmSmallDirective,

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

    ViewBdmComponent,
    HlmSpinnerComponent,
  ],
  providers: [
    provideIcons({
      lucideBell,
      lucideSearch,
      lucideMoveHorizontal,
      lucidePlus,
      lucideChevronsUpDown,
      lucideFilter,
    }),
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  getStatusVariant = getStatusVariant;
  // getPriorityVariant = getPriorityVariant;
  _router = inject(Router);
  staffList = inject(StaffService).staffList;

  isLoading = signal<boolean>(false);
  _report = signal<Report[]>([]);
  getView = signal<boolean>(false);

  ngOnInit(): void {
    for (let i = 0; i < this.staffList.length; i++) {
      // const element = this.staffList[i];
      
    }
    this._report.set([
      {
        id: 1,
        staffId: 12,
        name: 'Jide',
        budget: 20000000,
        negotationBudget: 10000000,
        leads: 7,
        opportunity: 5,
        won: 9,
        created_by: '',
        updated_by: '2024-07-01T10:30:00Z',
        created_at: '2024-07-01T10:30:00Z',
        updated_at: '',
      },
      {
        id: 2,
        staffId: 13,
        name: 'BJ',
        budget: 50000000,
        negotationBudget: 30000000,
        leads: 7,
        opportunity: 5,
        won: 9,
        created_by: '',
        updated_by: '2024-07-01T10:30:00Z',
        created_at: '2024-07-01T10:30:00Z',
        updated_at: '',
      },
      {
        id: 3,
        staffId: 14,
        name: 'Samuel',
        budget: 100000000,
        negotationBudget: 70000000,
        leads: 7,
        opportunity: 5,
        won: 9,
        created_by: '',
        updated_by: '2024-07-01T10:30:00Z',
        created_at: '2024-07-01T10:30:00Z',
        updated_at: '',
      },
      {
        id: 4,
        staffId: 15,
        name: 'Victor',
        budget: 60000000,
        negotationBudget: 30000000,
        leads: 7,
        opportunity: 5,
        won: 9,
        created_by: '',
        updated_by: '2024-07-01T10:30:00Z',
        created_at: '2024-07-01T10:30:00Z',
        updated_at: '',
      },
    ]);
  }

  onVeiw(e: any) {
    // this._router.navigate(['bdm', 'view-bdm']);
  }
}
