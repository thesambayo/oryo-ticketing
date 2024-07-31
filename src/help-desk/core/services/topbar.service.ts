import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../libs/services/auth.service';

interface TopbarDetails {
	title: string;
	staffName: string;
	backRoute?: string;
}

@Injectable({
	providedIn: 'root'
})
export class TopbarService {
	_authService = inject(AuthService);
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
