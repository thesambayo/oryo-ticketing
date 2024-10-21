import { ApiResponse } from "../../../../core/models/api-data";
import { LoggedInStaff } from "../../models/login-item";
import { Department } from "../../models/staff";

export const loginItem1: ApiResponse<LoggedInStaff> = {
	data: {
		authentication_token:
			"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvcGVyYXRpb25zLm9yeW9sdGQub3JnIiwic3ViIjoiMjIiLCJhdWQiOlsib3BlcmF0aW9ucy5vcnlvbHRkLm9yZyJdLCJleHAiOjE3Mjk0NjAwMjUuODAwOTEyOSwibmJmIjoxNzI5MzczNjI1LjgwMDkxMjksImlhdCI6MTcyOTM3MzYyNS44MDA5MTI5fQ.xMH3tJaifQ3S7AZXN4UkJ85aCataPHCNJDbzwJqNGKs",
		staff: {
			id: 22,
			created_at: "2024-08-05T10:59:42+01:00",
			name: "samuel Adebayo",
			email: "samuel.adebayo@oryoltd.com",
			activated: true,
			permissions: ["md"],
			department: {
				id: 1,
				name: Department.DIGITAL_PRODUCTS,
			},
		},
	},
	error: null,
};
