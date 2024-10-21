import { Component } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { BrnDialogTriggerDirective, BrnDialogContentDirective } from "@spartan-ng/ui-dialog-brain";
import {
	HlmDialogComponent,
	HlmDialogContentComponent,
	HlmDialogHeaderComponent,
	HlmDialogFooterComponent,
	HlmDialogTitleDirective,
	HlmDialogDescriptionDirective,
} from "@spartan-ng/ui-dialog-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";

@Component({
	selector: "oryo-create",
	standalone: true,
	imports: [
		BrnDialogTriggerDirective,
		BrnDialogContentDirective,

		HlmDialogComponent,
		HlmDialogContentComponent,
		HlmDialogHeaderComponent,
		HlmDialogFooterComponent,
		HlmDialogTitleDirective,
		HlmDialogDescriptionDirective,

		HlmLabelDirective,
		HlmInputDirective,
		HlmButtonDirective,
	],
	templateUrl: "./create.component.html",
	styleUrl: "./create.component.css",
})
export class CreateComponent {}
