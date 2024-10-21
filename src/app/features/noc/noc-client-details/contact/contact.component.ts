import { Component, HostBinding, inject } from "@angular/core";
import { lucideMail, lucidePhoneCall } from "@ng-icons/lucide";
import { BrnDialogRef, injectBrnDialogContext } from "@spartan-ng/ui-dialog-brain";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";

@Component({
	selector: "oryo-contact",
	standalone: true,
	imports: [HlmIconComponent],
	providers: [provideIcons({ lucideMail, lucidePhoneCall })],
	templateUrl: "./contact.component.html",
	styleUrl: "./contact.component.css",
})
export class ContactComponent {
	@HostBinding("class") private readonly _class: string = "flex flex-col gap-4";

	private readonly _dialogRef = inject<BrnDialogRef<any>>(BrnDialogRef);
	private readonly _dialogContext = injectBrnDialogContext<{ users: any }>();

	protected readonly users = this._dialogContext.users;
}
