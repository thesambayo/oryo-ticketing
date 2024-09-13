export interface VehicleReport {
	companyId: number;
	/**
	 * @name DV
	 * @description device id
	 * @type string
	 * @example "352016705343465"
	 */
	DV: string;
	/**
	 * @name NN
	 * @description nickname
	 * @type string
	 * @example "T-11462LA"
	 */
	NN: string;
	/**
	 * @name PN
	 * @description plate number
	 * @type string
	 * @example "T-11462LA"
	 */
	PN: string;
	/**
	 * @name DR
	 * @description driver id
	 * @type number
	 * @example 349682
	 */
	DR: number;
	/**
	 * @name DN
	 * @description driver name
	 * @type string
	 * @example "ByPass"
	 */
	DN: string;
	/**
	 * @name TT
	 * @description trip type
	 * @type number
	 * @example 0
	 */
	TT: number;
	/**
	 * @name EC
	 * @description event code
	 * @type number
	 * @example 28
	 */
	EC: number;
	/**
	 * @name EN
	 * @description event name
	 * @type string
	 * @example "Sleep mode"
	 */
	EN: string;
	/**
	 * @name EI
	 * @description event info --future
	 * @type string
	 * @example ""
	 */
	EI: string;
	/**
	 * @name ET
	 * @description event time
	 * @type string
	 * @example "2024-08-27 10:40:22"
	 */
	ET: string;
	/**
	 * @name ER
	 * @description event color
	 * @type number
	 * @example 50
	 */
	ER: number;
	/**
	 * @name SP
	 * @description speed
	 * @type number
	 * @example 0
	 */
	SP: number;
	/**
	 * @name OD
	 * @description odometer
	 * @type number
	 * @example 11
	 */
	OD: number;
	/**
	 * @name EH
	 * @description engine hours -- future
	 * @type number
	 * @example 0
	 */
	EH: number;
	/**
	 * @name GS
	 * @description GPS status
	 * @type number
	 * @example 2
	 */
	GS: number;
	/**
	 * @name ST
	 * @description satellites
	 * @type number
	 * @example 0
	 */
	ST: number;
	/**
	 * @name X
	 * @description longitude
	 * @type number
	 * @example 3.26112
	 */
	X: number;
	/**
	 * @name Y
	 * @description latitude
	 * @type number
	 * @example 6.444602
	 */
	Y: number;
	/**
	 * @name HD
	 * @description heading
	 * @type number
	 * @example 0
	 */
	HD: number;
	/**
	 * @name RPM
	 * @description RPM??
	 * @type number
	 * @example 0
	 */
	RPM: number;
	/**
	 * @name FP
	 * @description fuel level(%)
	 * @type number
	 * @example 42.5
	 */
	FP: number;
	/**
	 * @name FQ
	 * @description fuel level (quantity)
	 * @type number
	 * @example 160.1
	 */
	FQ: number;
	/**
	 * @name VS
	 * @description vehicle state
	 * @type number
	 * @example 3
	 */
	VS: number;
	/**
	 * @name RG
	 * @description region name
	 * @type string
	 * @example ""
	 */
	RG: string;
	/**
	 * @name BL
	 * @description battery level
	 * @type number
	 * @example 25.4
	 */
	BL: number;
	/**
	 * @name IFN
	 * @description image filename for vehicle
	 * @type string
	 * @example "Truck.png"
	 */
	IFN: string;
	/**
	 * @name IDS
	 * @description idle time duration -- value in seconds
	 * @type number
	 * @example 0
	 */
	IDS: number;
	/**
	 * @name PDS
	 * @description parking time duration -- value in seconds
	 * @type number
	 * @example 505497
	 */
	PDS: number;
	/**
	 * @name PDS
	 * @description trip duration -- value in seconds
	 * @type number
	 * @example 0
	 */
	TDS: number;
}

export interface VehiclesGlobalReport {
	total_vehicles: number;
	moving_vehicles: number;
	idle_vehicles: number;
	ignition_off_vehicles: number;
	non_reporting_vehicles: number;
	reporting_vehicles: number;
}

export enum VehicleStatus {
	total_vehicles = "total_vehicles",
	reporting_vehicles = "reporting_vehicles",
	non_reporting_vehicles = "non_reporting_vehicles",
	moving_vehicles = "moving_vehicles",
	idle_vehicles = "idle_vehicles",
	ignition_off_vehicles = "ignition_off_vehicles",
}

export interface VehicleData {
	id: number;
	plate_number: string;
	battery_voltage: number;
	no_of_pallets: number;
	no_of_tanks: number;
	calibrated_main_tank_capacity: number;
	calibrated_reserve_tank_capacity: number;
	device_name: string;
	device_type: string;
	device_imei: string;
	device_serial_no: string;
	sim_number: string;
	sim_serial_number: string;
	camera_imei: string;
	camera_serial_no: string;
	camera_sim_number: string;
	camera_sim_serial_number: string;
	tracker_sim_number: string;
	tracker_sim_serial_number: string;
	rfid_id_tank_one: string;
	rfid_id_tank_two: string;
	created_at: string;
	updated_at: string;
	date_of_installation_completion: string;
	date_of_WFL_config_completion: string;
	installation_remarks: string;
	version: number;
	vehicles_client_id: number;
}

export interface ClientVehicle {
	"id": number;
	"company_name": string;
	vehicles: VehicleData[];
}