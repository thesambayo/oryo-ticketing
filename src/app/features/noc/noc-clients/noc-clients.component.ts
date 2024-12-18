import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { provideIcons } from "@ng-icons/core";
import {
	lucideArrowLeft,
	lucideBell,
	lucideChevronsUpDown,
	lucideEllipsis,
	lucideFilter,
} from "@ng-icons/lucide";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import {
	BrnPopoverComponent,
	BrnPopoverTriggerDirective,
	BrnPopoverContentDirective,
	BrnPopoverCloseDirective,
} from "@spartan-ng/ui-popover-brain";
import { HlmPopoverContentDirective, HlmPopoverCloseDirective } from "@spartan-ng/ui-popover-helm";
import { CreateComponent } from "../noc-client-details/create/create.component";
import { VehiclesStore } from "../../../store/vehicles.store";

@Component({
	selector: "oryo-noc-clients",
	standalone: true,
	imports: [
		HlmIconComponent,
		BrnPopoverComponent,
		BrnPopoverTriggerDirective,
		BrnPopoverContentDirective,
		BrnPopoverCloseDirective,
		HlmPopoverContentDirective,
		HlmPopoverCloseDirective,
		HlmButtonDirective,
		CreateComponent,
	],
	providers: [
		provideIcons({
			lucideChevronsUpDown,
			lucideFilter,
			lucideBell,
			lucideArrowLeft,
			lucideEllipsis,
		}),
	],
	templateUrl: "./noc-clients.component.html",
	styleUrl: "./noc-clients.component.css",
})
export class NocClientsComponent implements OnInit {
	private _router = inject(Router);
	private _vehiclesStore = inject(VehiclesStore);
	// private _hlmDialogService = inject(HlmDialogService);

	companies = this._vehiclesStore.clients;
	vehiclesGlobalReports = this._vehiclesStore.globalReports;

	cars: any[] = [];

	ngOnInit(): void {}

	onBack() {
		this._router.navigate(["/noc"]);
	}
	// Other component methods and properties'
	goToClientDetails(clientId: number) {
		this._router.navigateByUrl("/noc/clients/" + clientId);
	}

	// openDynamicComponent(e?: any) {
	// 	const dialogRef = this._hlmDialogService.open(ContactComponent, {
	// 		context: {
	// 			users: e,
	// 		},
	// 	});

	// 	dialogRef.closed$.subscribe((user) => {
	// 		if (user) {
	// 			// console.log('Selected user:', user);
	// 		}
	// 	});
	// }
}
