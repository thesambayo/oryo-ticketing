import { Staff } from "./staff";

export interface StaffLoginPayload {
	email: string;
	password: string;
}

export interface StaffRestPayload {
	currentPassword: string;
	newPassword: string;
}

export interface LoggedInStaff {
	authentication_token: string;
	staff: Staff;
}
