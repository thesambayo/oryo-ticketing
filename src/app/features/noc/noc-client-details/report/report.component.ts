import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { provideIcons } from "@ng-icons/core";
import { lucideArrowLeft, lucideChevronsUpDown, lucideFileText, lucideFilter } from "@ng-icons/lucide";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import {
	HlmPaginationDirective,
	HlmPaginationContentDirective,
	HlmPaginationItemDirective,
	HlmPaginationPreviousComponent,
	HlmPaginationNextComponent,
	HlmPaginationLinkDirective,
	HlmPaginationEllipsisComponent,
} from "@spartan-ng/ui-pagination-helm";
import {
	BrnPopoverComponent,
	BrnPopoverTriggerDirective,
	BrnPopoverContentDirective,
	BrnPopoverCloseDirective,
} from "@spartan-ng/ui-popover-brain";
import { HlmPopoverContentDirective, HlmPopoverCloseDirective } from "@spartan-ng/ui-popover-helm";
import { BrnRadioGroupComponent, BrnRadioComponent } from "@spartan-ng/ui-radiogroup-brain";
import {
	HlmRadioIndicatorComponent,
	HlmRadioDirective,
	HlmRadioGroupDirective,
} from "@spartan-ng/ui-radiogroup-helm";
import { HlmSmallDirective } from "@spartan-ng/ui-typography-helm";

@Component({
	selector: "oryo-report",
	standalone: true,
	imports: [
		FormsModule,
		NgClass,

		HlmIconComponent,

		BrnPopoverComponent,
		BrnPopoverTriggerDirective,
		BrnPopoverContentDirective,
		BrnPopoverCloseDirective,
		HlmPopoverContentDirective,
		HlmPopoverCloseDirective,

		BrnRadioGroupComponent,
		BrnRadioComponent,
		HlmRadioIndicatorComponent,
		HlmRadioDirective,
		HlmRadioGroupDirective,
		HlmSmallDirective,

		HlmPaginationDirective,
		HlmPaginationContentDirective,
		HlmPaginationItemDirective,
		HlmPaginationPreviousComponent,
		HlmPaginationNextComponent,
		HlmPaginationLinkDirective,
		HlmPaginationEllipsisComponent,
	],
	providers: [provideIcons({ lucideChevronsUpDown, lucideFilter, lucideArrowLeft, lucideFileText })],
	templateUrl: "./report.component.html",
	styleUrl: "./report.component.css",
})
export class ReportComponent {
	_router = inject(Router);

	onBack() {
		// Perform action to navigate back to previous page
		this._router.navigate(["noc", "details"]);
	}
}
