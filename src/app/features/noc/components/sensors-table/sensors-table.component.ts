import { SelectionModel } from "@angular/cdk/collections";
import { DecimalPipe, TitleCasePipe } from "@angular/common";
import { Component, TrackByFunction, computed, effect, input, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { lucideArrowUpDown, lucideChevronDown, lucideEllipsis } from "@ng-icons/lucide";
import { HlmButtonModule } from "@spartan-ng/ui-button-helm";
import { HlmCheckboxCheckIconComponent, HlmCheckboxComponent } from "@spartan-ng/ui-checkbox-helm";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { BrnMenuTriggerDirective } from "@spartan-ng/ui-menu-brain";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnTableModule, PaginatorState, useBrnColumnManager } from "@spartan-ng/ui-table-brain";
import { HlmTableModule } from "@spartan-ng/ui-table-helm";
import { BrnSelectModule } from "@spartan-ng/ui-select-brain";
import { HlmSelectModule } from "@spartan-ng/ui-select-helm";
import { debounceTime, map } from "rxjs";
import { VehicleData } from "../../noc.model";

const PAYMENT_DATA: VehicleData[] = [];

@Component({
	selector: "oryo-sensors-table",
	standalone: true,
	imports: [
		FormsModule,

		BrnMenuTriggerDirective,
		HlmMenuModule,

		BrnTableModule,
		HlmTableModule,

		HlmButtonModule,

		DecimalPipe,
		TitleCasePipe,
		HlmIconComponent,
		HlmInputDirective,

		HlmCheckboxCheckIconComponent,
		HlmCheckboxComponent,

		BrnSelectModule,
		HlmSelectModule,
	],
	providers: [provideIcons({ lucideChevronDown, lucideEllipsis, lucideArrowUpDown })],
	host: {
		class: "w-full",
	},
	templateUrl: "./sensors-table.component.html",
	styleUrl: "./sensors-table.component.css",
})
export class SensorsTableComponent {
	public readonly _sensorsList = input.required<VehicleData[]>();
	// private readonly _sensorsList = signal(PAYMENT_DATA);

	protected readonly _rawFilterInput = signal("");
	protected readonly _plateNumberFilter = signal("");
	private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));

	private readonly _displayedIndices = signal({ start: 0, end: 0 });
	protected readonly _availablePageSizes = [5, 10, 20, 10000];
	protected readonly _pageSize = signal(this._availablePageSizes[0]);

	private readonly _selectionModel = new SelectionModel<VehicleData>(true);
	protected readonly _isPaymentSelected = (payment: VehicleData) => this._selectionModel.isSelected(payment);
	protected readonly _selected = toSignal(
		this._selectionModel.changed.pipe(map((change) => change.source.selected)),
		{
			initialValue: [],
		}
	);

	protected readonly _brnColumnManager = useBrnColumnManager({
		plate_number: { visible: true, label: "Plate number" },
		nick_name: { visible: true, label: "Nick name" },
		vehicle_type: { visible: true, label: "Vehicle type" },
		client_fleet_group: { visible: true, label: "Fleet group" },
		fuel_type: { visible: true, label: "Fuel type" },
		device_imei: { visible: true, label: "Device imei" },
	});
	protected readonly _allDisplayedColumns = computed(() => [
		// 'select',
		...this._brnColumnManager.displayedColumns(),
		"actions",
	]);

	private readonly _filteredPayments = computed(() => {
		const plateNumberFilter = this._plateNumberFilter()?.trim()?.toLowerCase();
		if (plateNumberFilter && plateNumberFilter.length > 0) {
			return this._sensorsList().filter((u) => u.plate_number.toLowerCase().includes(plateNumberFilter));
		}
		return this._sensorsList();
	});
	private readonly _plateNumberSort = signal<"ASC" | "DESC" | null>(null);
	protected readonly _filteredSortedPaginatedPayments = computed(() => {
		const sort = this._plateNumberSort();
		const start = this._displayedIndices().start;
		const end = this._displayedIndices().end + 1;
		const payments = this._filteredPayments();
		if (!sort) {
			return payments.slice(start, end);
		}
		return [...payments]
			.sort((p1, p2) => (sort === "ASC" ? 1 : -1) * p1.plate_number.localeCompare(p2.plate_number))
			.slice(start, end);
	});
	protected readonly _allFilteredPaginatedPaymentsSelected = computed(() =>
		this._filteredSortedPaginatedPayments().every((payment) => this._selected().includes(payment))
	);
	protected readonly _checkboxState = computed(() => {
		const noneSelected = this._selected().length === 0;
		const allSelectedOrIndeterminate = this._allFilteredPaginatedPaymentsSelected() ? true : "indeterminate";
		return noneSelected ? false : allSelectedOrIndeterminate;
	});

	protected readonly _trackBy: TrackByFunction<VehicleData> = (_: number, p: VehicleData) => p.id;
	protected readonly _totalElements = computed(() => this._filteredPayments().length);
	protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
		this._displayedIndices.set({ start: startIndex, end: endIndex });

	constructor() {
		// needed to sync the debounced filter to the name filter, but being able to override the
		// filter when loading new users without debounce
		effect(() => this._plateNumberFilter.set(this._debouncedFilter() ?? ""), {
			allowSignalWrites: true,
		});
	}

	protected togglePayment(payment: VehicleData) {
		this._selectionModel.toggle(payment);
	}

	protected handleHeaderCheckboxChange() {
		const previousCbState = this._checkboxState();
		if (previousCbState === "indeterminate" || !previousCbState) {
			this._selectionModel.select(...this._filteredSortedPaginatedPayments());
		} else {
			this._selectionModel.deselect(...this._filteredSortedPaginatedPayments());
		}
	}

	protected handleEmailSortChange() {
		const sort = this._plateNumberSort();
		if (sort === "ASC") {
			this._plateNumberSort.set("DESC");
		} else if (sort === "DESC") {
			this._plateNumberSort.set(null);
		} else {
			this._plateNumberSort.set("ASC");
		}
	}
}
