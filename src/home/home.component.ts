import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarFallbackDirective } from '../libs/ui/ui-avatar-helm/src/lib/fallback';
import { HlmAvatarComponent } from '../libs/ui/ui-avatar-helm/src/lib/hlm-avatar.component';
import { HlmAvatarImageDirective } from '../libs/ui/ui-avatar-helm/src/lib/image';
import { HlmIconComponent } from '../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../libs/services/auth.service';
import { InitialsPipe } from '@spartan-ng/ui-avatar-brain';

@Component({
  selector: 'oryo-home',
  standalone: true,
  
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    RouterLink,
    RouterLinkActive,
		InitialsPipe
  ],
  providers: [provideIcons({ lucideBell})],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	_router = inject(Router);
	staffName = inject(AuthService).getLoggedInStaff()?.staff.name;

	modules = [
		{
			title: "NOC Dashboard",
			img: "noc-dashboard-icon.svg",
			route: "",
			comingSoon: true,
		},
		{
			title: "Service Desk Module",
			img: "../../service-desk-icon.svg",
			route: "/help-desk",
			comingSoon: false,
		},
		{
			title: "Procurement",
			img: "../../finance-icon.svg",
			route: "",
			comingSoon: true,
		},
		{
			title: "Business Development",
			img: "../../business-development-icon.svg",
			route: "/bdm",
			comingSoon: false,
		},
		{
			title: "HR Module",
			img: "../../hr-icon.svg",
			route: "",
			comingSoon: true,
		},
		{
			title: "Project Management",
			img: "../../project-management-icon.svg",
			route: "",
			comingSoon: true,
		},
	]

	handleRoute(route: string, comingSoon: boolean) {
		if (comingSoon) return;

		this._router.navigateByUrl(route);
	}

}
