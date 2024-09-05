import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HlmPopoverContentDirective,
  HlmPopoverCloseDirective,
} from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverComponent,
  BrnPopoverTriggerDirective,
  BrnPopoverContentDirective,
  BrnPopoverCloseDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideArrowLeft, lucideChevronsUpDown, lucideFileBarChart, lucideFilter } from '@ng-icons/lucide';
import {
  BrnRadioComponent,
  BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioIndicatorComponent,
  HlmRadioDirective,
  HlmRadioGroupDirective,
} from '@spartan-ng/ui-radiogroup-helm';
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import {
  HlmPaginationDirective,
  HlmPaginationContentDirective,
  HlmPaginationItemDirective,
  HlmPaginationPreviousComponent,
  HlmPaginationNextComponent,
  HlmPaginationLinkDirective,
  HlmPaginationEllipsisComponent,
} from '@spartan-ng/ui-pagination-helm';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemDirective, HlmMenuItemIconDirective, HlmMenuItemSubIndicatorComponent, HlmMenuLabelComponent, HlmMenuSeparatorComponent, HlmMenuShortcutComponent, HlmSubMenuComponent } from '@spartan-ng/ui-menu-helm';
import { NocMainDashboardComponent } from "./noc-main-dashboard/noc-main-dashboard.component";
import { VehiclesStore } from '../../store/vehicles.store';

@Component({
  selector: 'oryo-noc-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
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
    NocMainDashboardComponent
],
  providers: [provideIcons({ lucideChevronsUpDown, lucideFilter, 
    lucideFileBarChart,lucideArrowLeft})],
  templateUrl: './noc-dashboard.component.html',
  styleUrl: './noc-dashboard.component.css',
})
export class NocDashboardComponent implements OnInit {
	private _router = inject(Router)
	private _vehiclesStore = inject(VehiclesStore);
	
  selectedStatus: string = '';
	vehicles = this._vehiclesStore.vehicles;
	vehiclesGlobalReports = this._vehiclesStore.globalReports;


  ngOnInit(): void {
  }

  onStatusChange(value: string) {
    this.selectedStatus = value;
    // Perform other actions as needed
  }
  getGlobalValue(e: any) {
    this.selectedStatus = e
    // Perform other actions as needed
  }
  onBack() {
    this.selectedStatus =''
  }
  onReport() {
    this._router.navigate(['noc', 'noc-clients']);
  }
}
