import { Injectable } from '@angular/core';
// might move to core models
import { LoggedInStaff } from '../../features/auth/models/login-item';
const STAFF_STORAGE_KEY = "loggedInStaff";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  	// save user to localstorage
	storeLoggedInStaffDetails(staff: LoggedInStaff) {
		localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staff));
	}

	getLoggedInStaff(): LoggedInStaff | null {
		const storedItem = localStorage.getItem(STAFF_STORAGE_KEY);
		if (!storedItem) return null;
		return JSON.parse(storedItem) as LoggedInStaff;
	}
}
