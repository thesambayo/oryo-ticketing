import { Component } from '@angular/core';
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
  mainNavigationItems: NavItem[] = [
    {
      label: 'Dashboard',
      routerLink: '/business-development',
      icon: 'lucideLayoutGrid',
    },
    // {
    //   label: 'Budget',
    //   routerLink: '/business-development/budget',
    //   icon: 'lucideBadgeDollarSign',
    // },
    {
      label: 'Leads',
      routerLink: '/business-development/leads',
      icon: 'lucideFileArchive',
    },
    {
      label: 'Report',
      routerLink: '/',
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
}
