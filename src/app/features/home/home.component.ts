import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarFallbackDirective } from '../../shared/ui/ui-avatar-helm/src/lib/fallback';
import { HlmAvatarComponent } from '../../shared/ui/ui-avatar-helm/src/lib/hlm-avatar.component';
import { HlmAvatarImageDirective } from '../../shared/ui/ui-avatar-helm/src/lib/image';
import { HlmIconComponent } from '../../shared/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InitialsPipe } from '@spartan-ng/ui-avatar-brain';
import { StorageService } from '../../core/services/storage.service';

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
	staffName = inject(StorageService).getLoggedInStaff()?.staff.name;

	modules = [
		{
			title: "NOC Dashboard",
			img: "noc-dashboard-icon.svg",
			route: "/noc",
			comingSoon: false,
		},
		{
			title: "Procurement",
			img: "../../finance-icon.svg",
			route: "",
			comingSoon: true,
		},
	]

	handleRoute(route: string, comingSoon: boolean) {
		if (comingSoon) return;
		this._router.navigateByUrl(route);
	}

}
