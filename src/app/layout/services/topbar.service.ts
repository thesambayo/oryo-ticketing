import { inject, Injectable, signal } from "@angular/core";
import { TopbarDetails } from "../models/topbar";
import { StorageService } from "../../core/services/storage.service";

@Injectable({
	providedIn: "root",
})
export class TopbarService {
	readonly _storageService = inject(StorageService);
	topbarDetails = signal<TopbarDetails>({
		title: "",
		staffName: this._storageService.getLoggedInStaff()?.staff.name ?? "",
		backRoute: undefined,
	});

	updateTopbarDetails(details: Omit<TopbarDetails, "staffName">) {
		this.topbarDetails.update((value) => ({
			...value,
			...details,
		}));
	}
}
