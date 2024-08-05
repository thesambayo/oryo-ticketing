import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
import { CreateLeadsComponent } from '../../bdm/components/create-leads/create-leads.component';
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
    CreateLeadsComponent,
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
	_router = inject(Router);
  _hlmDialogService = inject(HlmDialogService);
	
	
	_leads: boolean = false;
	modalInView: 'create-leads' | null = null;
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
      action: () => this.modalInView = 'create-leads',
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
    {
      label: 'Main menu',
      icon: 'lucideLogOut',
      action: () => this._router.navigateByUrl("/"),
    }
  ];

  openBudget() {
    this._hlmDialogService.open(CreateBudgetComponent, {});
  }
}
