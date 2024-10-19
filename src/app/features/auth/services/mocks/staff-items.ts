import { Department, Staff } from "../../models/staff";

export const staffItem1: Staff = {
	id: 22,
	created_at: "2024-08-05T10:59:42+01:00",
	name: "samuel Adebayo",
	email: "samuel.adebayo@oryoltd.com",
	activated: true,
	permissions: [
		"md"
	],
	department: {
		id: 1,
		name: Department.DIGITAL_PRODUCTS
	}
}

export const staffItem2: Staff = {
	"id": 24,
	"created_at": "2024-08-16T04:35:55+01:00",
	"name": "Dami lola",
	"email": "dami.lola@oryoltd.com",
	"activated": false,
	"permissions": [
		"staff:manager",
		"bdm:manager"
	],
	"department": {
		"id": 4,
		"name": Department.HR
	}
}

export const staffItems = [staffItem1, staffItem2];
// const staffItem1 = {
// 	"data": {
// 			"authentication_token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvcGVyYXRpb25zLm9yeW9sdGQub3JnIiwic3ViIjoiMjIiLCJhdWQiOlsib3BlcmF0aW9ucy5vcnlvbHRkLm9yZyJdLCJleHAiOjE3Mjk0NjAwMjUuODAwOTEyOSwibmJmIjoxNzI5MzczNjI1LjgwMDkxMjksImlhdCI6MTcyOTM3MzYyNS44MDA5MTI5fQ.xMH3tJaifQ3S7AZXN4UkJ85aCataPHCNJDbzwJqNGKs",
// 			"staff": {
// 					"id": 22,
// 					"created_at": "2024-08-05T10:59:42+01:00",
// 					"name": "samuel Adebayo",
// 					"email": "samuel.adebayo@oryoltd.com",
// 					"activated": true,
// 					"permissions": [
// 							"md"
// 					],
// 					"department": {
// 							"id": 1,
// 							"name": "Digital products"
// 					}
// 			}
// 	}
// }