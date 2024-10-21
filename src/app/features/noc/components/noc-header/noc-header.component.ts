import { Component, inject } from "@angular/core";
import { provideIcons } from "@ng-icons/core";
import {
	lucideBell,
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
} from "@ng-icons/lucide";
import { HlmAvatarFallbackDirective } from "../../../../shared/ui/ui-avatar-helm/src/lib/fallback";
import { HlmAvatarComponent } from "../../../../shared/ui/ui-avatar-helm/src/lib/hlm-avatar.component";
import { HlmAvatarImageDirective } from "../../../../shared/ui/ui-avatar-helm/src/lib/image";
import { HlmIconComponent } from "../../../../shared/ui/ui-icon-helm/src/lib/hlm-icon.component";
import { TopbarService } from "../../../../layout/services/topbar.service";
import { InitialsPipe } from "@spartan-ng/ui-avatar-brain";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { BrnMenuTriggerDirective } from "@spartan-ng/ui-menu-brain";
import {
	HlmMenuComponent,
	HlmSubMenuComponent,
	HlmMenuItemDirective,
	HlmMenuItemSubIndicatorComponent,
	HlmMenuLabelComponent,
	HlmMenuShortcutComponent,
	HlmMenuSeparatorComponent,
	HlmMenuItemIconDirective,
	HlmMenuGroupComponent,
} from "@spartan-ng/ui-menu-helm";
import { Router } from "@angular/router";

@Component({
	selector: "oryo-noc-header",
	standalone: true,
	imports: [
		HlmAvatarImageDirective,
		HlmAvatarComponent,
		HlmAvatarFallbackDirective,
		HlmIconComponent,
		InitialsPipe,

		BrnMenuTriggerDirective,

		HlmMenuComponent,
		HlmSubMenuComponent,
		HlmMenuItemDirective,
		HlmMenuItemSubIndicatorComponent,
		HlmMenuLabelComponent,
		HlmMenuShortcutComponent,
		HlmMenuSeparatorComponent,
		HlmMenuItemIconDirective,
		HlmMenuGroupComponent,

		HlmButtonDirective,
		HlmIconComponent,
	],
	providers: [
		provideIcons({
			lucideBell,
			lucideUser,
			lucideLayers,
			lucideCog,
			lucideKeyboard,
			lucideSmile,
			lucidePlus,
			lucideGithub,
			lucideCode,
			lucideLogOut,
			lucideMail,
			lucideMessageSquare,
		}),
	],
	templateUrl: "./noc-header.component.html",
	styleUrl: "./noc-header.component.css",
})
export class NocHeaderComponent {
	_topbarDetails = inject(TopbarService).topbarDetails;
	_router = inject(Router);

	backbtn() {
		this._router.navigateByUrl("/");
	}
}
