import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

interface TopbarDetails {
	title: string;
	staffName: string;
	backRoute?: string;
}

@Injectable({
	providedIn: 'root'
})
export class TopbarService {
	_authService = inject(StorageService);
	topbarDetails = signal<TopbarDetails>({
		title: "",
		staffName: this._authService.getLoggedInStaff()?.staff.name ?? "",
		backRoute: undefined
	});


	updateTopbarDetails(details: Omit<TopbarDetails, "staffName">) {
		this.topbarDetails.update((value) => ({
			...value,
			...details
		}))
	}

}
