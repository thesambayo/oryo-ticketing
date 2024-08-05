export interface StaffLoginPayload {
	email: string;
	password: string;
}
export interface StaffRestPayload {
	currentPassword: string;
	newPassword: string;
}

export interface LoggedInStaff {
	authentication_token: {
		token: string;
		expiry: string;
	},
	staff: {
		id: number;
		created_at: string;
		name: string;
		email: string;
		activated: boolean;
	}
}