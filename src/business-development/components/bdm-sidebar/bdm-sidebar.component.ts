import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideLayoutGrid,
  lucideUsers,
  lucideLogOut,
  lucideUser,
  lucideTicket,
  lucideBadgeDollarSign,
  lucideFileArchive,
  lucideProportions,
} from '@ng-icons/lucide';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmIconComponent } from '../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmSeparatorDirective } from '../../../libs/ui/ui-separator-helm/src/lib/hlm-separator.directive';
import { CreateBdmComponent } from '../../bdm/components/create-bdm/create-bdm.component';
import { Lead } from '../../bdm/models/bdm-item';
import { HlmDialogService } from '../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.service';
import { CreateBudgetComponent } from '../../bdm/components/create-budget/create-budget.component';

interface NavItem {
  label: string;
  icon: string;
  routerLink?: string;
  action?: () => void;
}

@Component({
  selector: 'oryo-bdm-sidebar',
  standalone: true,
  imports: [
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmButtonDirective,
    RouterLink,
    RouterLinkActive,
    HlmIconComponent,
    CreateBdmComponent,
  ],
  providers: [
    provideIcons({
      lucideLayoutGrid,
      lucideUsers,
      lucideLogOut,
      lucideUser,
      lucideTicket,
      lucideBadgeDollarSign,
      lucideFileArchive,
      lucideProportions,
    }),
  ],
  templateUrl: './bdm-sidebar.component.html',
  styleUrl: './bdm-sidebar.component.css',
})
export class BdmSidebarComponent {
  _leads: boolean = false;

  _hlmDialogService = inject(HlmDialogService);

  mainNavigationItems: NavItem[] = [
    {
      label: 'Dashboard',
      routerLink: '/bdm',
      icon: 'lucideLayoutGrid',
    },
    {
      label: 'Create Budget',
      action: () => this.openBudget(),
      icon: 'lucideBadgeDollarSign',
    },
    {
      label: 'Create Leads',
      icon: 'lucideFileArchive',
      action: () => this.openDynamicComponent(),
    },
    {
      label: 'Report',
      routerLink: '/bdm/report',
      icon: 'lucideProportions',
    },
  ];
  otherNavigationItems: NavItem[] = [
    // {
    //   label: 'Start Over',
    //   routerLink: '/help-desk/profile',
    //   icon: 'lucideUser',
    // },
    // {
    //   label: 'Log Out',
    //   icon: 'lucideLogOut',
    //   action: () => this.logOutUser(),
    // }
  ];

  logOutUser() {
    console.log('loggin our uawe');
    // Log out user
  }

  openBudget() {
    this._hlmDialogService.open(CreateBudgetComponent, {});
    // Log out user
  }
  openDynamicComponent() {
    this._hlmDialogService.open(CreateBdmComponent, {});
  }
}
