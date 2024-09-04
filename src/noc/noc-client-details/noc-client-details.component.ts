import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideFilter,
  lucideBell,
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
import { NocService } from '../services/noc.service';
import { VehicleInfo } from '../noc.model';

@Component({
  selector: 'oryo-noc-client-details',
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
    }),
  ],
  templateUrl: './noc-client-details.component.html',
  styleUrl: './noc-client-details.component.css',
})
export class NocClientDetailsComponent implements OnInit {
  _router = inject(Router);
  _hlmDialogService = inject(HlmDialogService);
  _nocService = inject(NocService);
	_details = signal<any[]>([]);

  selectedStatus: string = 'Disconnected';
  onBack() {
    // Perform action to navigate back to previous page
    this._router.navigate(['noc', 'noc-clients']);
  }

  ngOnInit(): void {
    const navigation = this._router.getCurrentNavigation();
    console.log(navigation?.extras?.state);
    
    if (navigation?.extras?.state) {
      console.log(navigation.extras.state['details']);
      const details = navigation.extras.state['details']
      this._nocService.getClient(details).subscribe({
        next: (res) => {
          console.log(res.data);
          this._details.set(res.data);
          
        },
        error: () => {
        }
      })
      return
    }else {
      // this.onBack()
    }
  }

  onStatusChange(value: string) {
    this.selectedStatus = value;
    console.log(`${value} is selected`);
    // Perform other actions as needed
  }
  onReport(e?: any){
    const navigationExtras: NavigationExtras = {
      // relativeTo: this.route,
      state: {
        details: e
      },
    };
    this._router.navigate(['noc', 'details','details-report'], navigationExtras);
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
