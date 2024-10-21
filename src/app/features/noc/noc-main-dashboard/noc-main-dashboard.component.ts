import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";
import { HlmSelectImports } from "@spartan-ng/ui-select-helm";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { VehicleData, VehicleStatus } from "../noc.model";
import { VehiclesStore } from "../../../store/vehicles.store";
import { VehiclesService } from "../../../store/vehicles.service";
import {
	HlmAccordionContentDirective,
	HlmAccordionDirective,
	HlmAccordionIconDirective,
	HlmAccordionItemDirective,
	HlmAccordionTriggerDirective,
} from "@spartan-ng/ui-accordion-helm";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import { provideIcons } from "@ng-icons/core";
import { lucideFileDown } from "@ng-icons/lucide";
import { format } from "date-fns";

interface GetVehiclesParams {
	companyWlfId?: string;
	sensorStatus?: string;
	startDate?: string;
	endDate?: string;
}

interface GeneratedClientReport {
	id: number;
	company_name: string;
	total_vehicles: number;
	vehicles: VehicleData[];
}

@Component({
	selector: "oryo-noc-main-dashboard",
	standalone: true,
	imports: [
		DecimalPipe,
		HlmSpinnerComponent,
		BrnSelectImports,
		HlmSelectImports,
		HlmButtonDirective,
		HlmLabelDirective,
		HlmInputDirective,
		ReactiveFormsModule,
		FormsModule,
		HlmAccordionDirective,
		HlmAccordionItemDirective,
		HlmAccordionTriggerDirective,
		HlmAccordionContentDirective,
		HlmAccordionIconDirective,
		HlmIconComponent,
	],
	providers: [provideIcons({ lucideFileDown })],
	templateUrl: "./noc-main-dashboard.component.html",
	styleUrl: "./noc-main-dashboard.component.css",
})
export class NocMainDashboardComponent {
	readonly VehicleStatuses = VehicleStatus;

	_fb = inject(FormBuilder);
	private _router = inject(Router);
	private _vehiclesStore = inject(VehiclesStore);
	private _vehiclesService = inject(VehiclesService);
	vehiclesGlobalReports = this._vehiclesStore.globalReports;
	loadingGlobalReports = this._vehiclesStore.loadingGlobalReports;

	companies = this._vehiclesStore.clients;

	createCompantForm = this._fb.nonNullable.group({
		companyWlfId: this._fb.nonNullable.control(0, Validators.required),
		sensorStatus: this._fb.nonNullable.control("", [Validators.required]),
		startDate: this._fb.nonNullable.control("", [Validators.required]),
		endDate: this._fb.nonNullable.control({ value: "", disabled: true }, [Validators.required]),
	});

	generatedReportsResponse: GeneratedClientReport[] = [];
	errorGeneratingResponse = false;
	isGeneratingResponse = false;
	lastGeneratedPayload?: GetVehiclesParams;

	viewVehiclesReportByStatus(status: VehicleStatus) {
		this._router.navigate(["/noc/reports"], { queryParams: { status } });
	}

	onSubmit() {
		if (this.createCompantForm.invalid) return;

		this.isGeneratingResponse = true;
		this.errorGeneratingResponse = false;

		const payload: GetVehiclesParams = {
			companyWlfId: this.createCompantForm.value.companyWlfId
				? this.createCompantForm.value.companyWlfId.toString()
				: "",
			sensorStatus: this.createCompantForm.value.sensorStatus,
			startDate: this.createCompantForm.value.startDate,
			endDate: this.createCompantForm.value.endDate,
		};
		this.generatedReportsResponse = [];

		this._vehiclesService.getVehiclesByParams(payload).subscribe({
			next: (res) => {
				this.generatedReportsResponse = res.data.map<GeneratedClientReport>((resData) => ({
					id: resData.id,
					company_name: resData.company_name,
					total_vehicles: this.companies().find((company) => company.id === resData.id)?.total_vehicles ?? 0,
					vehicles: resData.vehicles,
				}));

				this.isGeneratingResponse = false;
				this.lastGeneratedPayload = payload;
			},
			error: (err) => {
				this.isGeneratingResponse = false;
				this.errorGeneratingResponse = true;
				console.log(err);
			},
		});
	}
	openAccordion($event: MouseEvent) {
		const currentAccordionItem = $event.target as HTMLButtonElement;
		currentAccordionItem.classList.toggle("active");

		const accordionsContainer = document.querySelector(".accordion-container");
		if (!accordionsContainer) return;

		const accordions = accordionsContainer.querySelectorAll(".accordion");
		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (let index = 0; index < accordions.length; index++) {
			const accordionItem = accordions[index];
			const panel = accordionItem.nextElementSibling as HTMLElement;
			if (accordionItem.id === currentAccordionItem.id) {
				panel.style.display = panel.style.display === "block" ? "none" : "block";
				continue;
			} else {
				accordionItem.classList.remove("active");
				panel.style.display = "none";
			}
		}
	}

	downloadAsCSV(report: GeneratedClientReport, $event: MouseEvent) {
		$event.stopPropagation();
		let reportingStatus = "";
		switch (this.lastGeneratedPayload?.sensorStatus) {
			case "reporting":
				reportingStatus = "reporting sensors";
				break;
			case "non_reporting":
				reportingStatus = "non reporting sensors";
				break;
			default:
				reportingStatus = "total status";
				break;
		}

		const today = format(new Date(), "PPpp");
		this._vehiclesService.exportCSVFile(
			[
				{ plate_number: "Plate Number" },
				{ nick_name: "Nick name" },
				{ device_imei: "Device imei" },
				{ fuel_type: "Fuel type" },
				{ client_fleet_group: "Fleet group" },
				{ availability_percentage: "Availability (%)" },
			],
			report.vehicles,
			`${report.company_name} ${reportingStatus}, ${today}`
		);
	}
}
