import { Component, OnInit } from '@angular/core';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideChevronRight, lucideLayoutGrid, lucideLogOut, lucideTicket, lucideUser, lucideUsers } from '@ng-icons/lucide';

interface NavItem {
  label: string;
  icon: string;
  routerLink?: string;
  action?: () => void;

}
@Component({
  selector: 'oryo-help-desk-sidebar',
  standalone: true,
  imports: [HlmSeparatorDirective, BrnSeparatorComponent, HlmButtonDirective, RouterLink, RouterLinkActive, HlmIconComponent],
  providers: [provideIcons({ lucideLayoutGrid, lucideUsers, lucideLogOut, lucideUser, lucideTicket })],
  templateUrl: './help-desk-sidebar.component.html',
  styleUrl: './help-desk-sidebar.component.css'
})
export class HelpDeskSidebarComponent {

  mainNavigationItems: NavItem[] = [
    {
      label: 'Dashboard',
      routerLink: '/help-desk',
      icon: 'lucideLayoutGrid',
    },
    {
      label: 'Tickets',
      routerLink: '/help-desk/tickets',
      icon: 'lucideTicket',
    },
    {
      label: 'Customers',
      routerLink: '/help-desk/customers',
      icon: 'lucideUser',
    },
  ];
  otherNavigationItems: NavItem[] = [
    {
      label: 'Profile',
      routerLink: '/help-desk/profile',
      icon: 'lucideUser',
    },
    {
      label: 'Log Out',
      icon: 'lucideLogOut',
      action: () => this.logOutUser(),
    }
  ];

  logOutUser() {
    console.log("loggin our uawe")
    // Log out user
  }

}
