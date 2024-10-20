import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideFilter,
  lucideArrowLeft,
  lucidePhoneCall,
  lucideCode,
  lucideCog,
  lucideGithub,
  lucideKeyboard,
  lucideLayers,
  lucideLogOut,
  lucideMail,
  lucideMessageSquare,
  lucidePlus,
  lucideSmile,
  lucideUser,
  lucideCircle,
  lucideFileBarChart,
  lucideEllipsis,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import {
  HlmPaginationDirective,
  HlmPaginationContentDirective,
  HlmPaginationItemDirective,
  HlmPaginationPreviousComponent,
  HlmPaginationNextComponent,
  HlmPaginationLinkDirective,
  HlmPaginationEllipsisComponent,
} from '@spartan-ng/ui-pagination-helm';
import {
  BrnPopoverComponent,
  BrnPopoverTriggerDirective,
  BrnPopoverContentDirective,
  BrnPopoverCloseDirective,
} from '@spartan-ng/ui-popover-brain';
import {
  HlmPopoverContentDirective,
  HlmPopoverCloseDirective,
} from '@spartan-ng/ui-popover-helm';
import {
  BrnRadioGroupComponent,
  BrnRadioComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioIndicatorComponent,
  HlmRadioDirective,
  HlmRadioGroupDirective,
} from '@spartan-ng/ui-radiogroup-helm';
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import { ContactComponent } from './contact/contact.component';
import { VehicleStatus } from '../noc.model';
import { VehiclesStore } from '../../../store/vehicles.store';

@Component({
  selector: 'oryo-noc-client-details',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    DatePipe,

    HlmIconComponent,

    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,

    BrnRadioGroupComponent,
    BrnRadioComponent,
    HlmRadioIndicatorComponent,
    HlmRadioDirective,
    HlmRadioGroupDirective,
    HlmSmallDirective,

    HlmPaginationDirective,
    HlmPaginationContentDirective,
    HlmPaginationItemDirective,
    HlmPaginationPreviousComponent,
    HlmPaginationNextComponent,
    HlmPaginationLinkDirective,
    HlmPaginationEllipsisComponent,

    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
    BrnMenuTriggerDirective,

    HlmButtonDirective,
  ],
  providers: [
    provideIcons({
      lucideChevronsUpDown,
      lucideFilter,
      lucideArrowLeft,
      lucidePhoneCall,
      lucideUser,
      lucideLayers,
      lucideCog,
      lucideKeyboard,
      lucideCircle,
      lucideSmile,
      lucidePlus,
      lucideGithub,
      lucideCode,
      lucideLogOut,
      lucideMail,
      lucideMessageSquare,
      lucideFileBarChart,
      lucideEllipsis,
    }),
  ],
  templateUrl: './noc-client-details.component.html',
  styleUrl: './noc-client-details.component.css',
})
export class NocClientDetailsComponent implements OnInit {
  readonly VehicleStatuses = VehicleStatus;

  private _router = inject(Router);
  private _hlmDialogService = inject(HlmDialogService);
  private _vehiclesStore = inject(VehiclesStore);

  selectedStatus: VehicleStatus = VehicleStatus.total_sensors;
  companyId: string = inject(ActivatedRoute).snapshot.params['id'];
  selectedCompanyVehicles = this._vehiclesStore.selectedCompanyVehicles;

  onBack() {
    this._router.navigateByUrl('/noc/clients');
  }

  ngOnInit(): void {
    this._vehiclesStore.setSelectedCompanyVehiclesId(Number(this.companyId));
  }

  handleSelectedStatusChange(value: VehicleStatus) {
    this.selectedStatus = value;
    console.log(`${value} is selected`);
    // Perform other actions as needed
  }

  openDynamicComponent(e?: any) {
    const dialogRef = this._hlmDialogService.open(ContactComponent, {
      context: {
        users: e,
      },
      contentClass: 'min-w-[900px]',
    });

    dialogRef.closed$.subscribe((user) => {
      if (user) {
        console.log('Selected user:', user);
      }
    });
  }
}
