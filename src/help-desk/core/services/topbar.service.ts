import { Injectable, signal } from '@angular/core';

interface TopbarDetails {
	title: string;
	staffName: string;
	backRoute?: string;
}

@Injectable({
	providedIn: 'root'
})
export class TopbarService {
	topbarDetails = signal<TopbarDetails>({
		title: "",
		staffName: "",
		backRoute: undefined
	});


	updateTopbarDetails(details: TopbarDetails) {
		this.topbarDetails.set(details);
	}



}
