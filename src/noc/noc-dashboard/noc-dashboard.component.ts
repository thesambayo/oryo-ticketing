import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { NocService } from '../services/noc.service';
import { CarGlobal, RefuelRecord, VehicleInfo } from '../noc.model';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemDirective, HlmMenuItemIconDirective, HlmMenuItemSubIndicatorComponent, HlmMenuLabelComponent, HlmMenuSeparatorComponent, HlmMenuShortcutComponent, HlmSubMenuComponent } from '@spartan-ng/ui-menu-helm';
import { NocMainDashboardComponent } from "./noc-main-dashboard/noc-main-dashboard.component";

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
  selectedStatus: string = '';
  _router = inject(Router)
  _nocService = inject(NocService);
	_log = signal<VehicleInfo[]>([]);
	_global = signal<CarGlobal | null>(null);


  ngOnInit(): void {
    
    this._nocService.getCars().subscribe({
			next: (res) => {
        // console.log(res.data);
				this._log.set(res.data);
        
			},
			error: () => {
			}
		})
    
    this._nocService.getCarsGlobal().subscribe({
			next: (res) => {
        // console.log(res.data);
				this._global.set(res.data);
        
			},
			error: () => {
			}
		})
  }

  onStatusChange(value: string) {
    this.selectedStatus = value;
    // console.log(`${value} is selected`);
    // Perform other actions as needed
  }
  getGlobalValue(e: any) {
    // console.log(e);
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
