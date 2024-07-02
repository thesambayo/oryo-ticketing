import { Component } from '@angular/core';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideChevronRight, lucideLayoutGrid, lucideLogOut, lucideTicket, lucideUser2, lucideUsers } from '@ng-icons/lucide';

@Component({
  selector: 'oryo-sidebar',
  standalone: true,
  imports: [HlmSeparatorDirective, BrnSeparatorComponent, HlmButtonDirective, RouterLink, RouterLinkActive, HlmIconComponent],
  providers: [provideIcons({ lucideLayoutGrid, lucideUsers, lucideLogOut, lucideUser2, lucideTicket })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
