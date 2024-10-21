import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InitialsPipe } from "@spartan-ng/ui-avatar-brain";
import { HlmAvatarFallbackDirective } from "../../shared/ui/ui-avatar-helm/src/lib/fallback";
import { HlmAvatarComponent } from "../../shared/ui/ui-avatar-helm/src/lib/hlm-avatar.component";
import { HlmAvatarImageDirective } from "../../shared/ui/ui-avatar-helm/src/lib/image";
import { HlmIconComponent } from "../../shared/ui/ui-icon-helm/src/lib/hlm-icon.component";
import { StorageService } from "../../core/services/storage.service";

@Component({
	selector: "oryo-home",
	standalone: true,

	imports: [
		HlmAvatarImageDirective,
		HlmAvatarComponent,
		HlmAvatarFallbackDirective,
		HlmIconComponent,
		RouterLink,
		InitialsPipe,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent {
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
	];
}
