import { Component, inject, OnInit, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmTableComponent, HlmTrowComponent, HlmThComponent, HlmTdComponent, HlmCaptionComponent } from '@spartan-ng/ui-table-helm';
import { CustomersService } from '../../services/customers.service';
import { TicketCustomer } from '../model';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { TopbarService } from '../../../core/services/topbar.service';

@Component({
  selector: 'oryo-customers-list',
  standalone: true,
  imports: [
		HlmButtonDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmTableComponent,
		HlmTrowComponent,
		HlmThComponent,
		HlmCheckboxComponent,
		HlmTdComponent,
		HlmCaptionComponent,
		HlmSpinnerComponent
	],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {
	_topbarService = inject(TopbarService);
	_customersService = inject(CustomersService);

	isLoading = signal<boolean>(false);
	customers = signal<TicketCustomer[]>([]);

	ngOnInit(): void {
		this._topbarService.updateTopbarDetails({
			title: "Customers",
			backRoute: undefined,
		});
		this.getInformation();
	}

	getInformation() {
		this.isLoading.set(true);
		this._customersService.getCustomersInfo().subscribe({
			next: (res) => {
				this.isLoading.set(false);
				this.customers.set(res.data);
			},
			error: () => {
				this.isLoading.set(false);
			}
		})
	}
}
