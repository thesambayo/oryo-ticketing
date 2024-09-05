export interface RefuelRecord {
  /**
   * @name IXID
   * @description unique record number / transaction id
   * @type number
   */
  IXID: number;
  /**
   * @name CID
   * @description Company id
   * @type number
   */
  CID: number;
  /**
   * @name PID
   * @description pump id
   * @type number
   */
  PID: string;
  /**
   * @name RT
   * @description Refuel time
   * @type number
   */
  RT: string;
  /**
   * @name DID
   * @description driver id
   * @type string
   */
  DID: string;
  /**
   * @name TID
   * @description unique trip id / Tag id
   * @type string
   */
  TID: string;
  /**
   * @name VID
   * @description vehicle device id
   * @type string
   */
  VID: string;
  /**
   * @name NN
   * @description vehicle nickname
   * @type string
   */
  NN: string;
  /**
   * @name OD
   * @description odometer
   * @type number
   */
  OD: number;
  /**
   * @name TC
   * @description total counter (Quantity)
   * @type number
   */
  TC: number;
  /**
   * @name EH
   * @description Engine hours
   * @type number
   */
  EH: number;
  /**
   * @name JID
   * @description project id (optional)
   * @type string
   */
  JID?: string;
  /**
   * @name CS
   * @description Counter start (optional)
   * @type number
   */
  CS?: number;
  /**
   * @name CE
   * @description Counter end (optional)
   * @type number
   */
  CE?: number;
  /**
   * @name TN
   * @description Tank name
   * @type string
   */
  TN: string;
  /**
   * @name CT
   * @description cost
   * @type number
   */
  CT: number;
  /**
   * @name DS
   * @description Distance
   * @type number
   */
  DS: number;
  /**
   * @name EHP
   * @description Previous engine hours
   * @type number
   */
  EHP: number;
  /**
   * @name EHT
   * @description Total engine hours (since previous)
   * @type number
   */
  EHT: number;
  /**
   * @name SID
   * @description Station id
   * @type number
   */
  SID: number;
  /**
   * @name CC
   * @description Cost center code
   * @type string
   */
  CC: string;
  /**
   * @name STATUS
   * @description Status
   * @type string
   */
  STATUS: NocStatus;
}

export interface VehicleInfo {
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
  totalVehicles: number;
  movingVehicles: number;
  idleVehicles: number;
  ignitionOffVehicles: number;
  disconnectedVehicles: number;
}
export enum NocStatus {
  Total_Vehicle = 'TotalVehicle',
  Moving_Vehicles = 'MovingVehicles',
  Idle_Vehicle = 'CANCELLED',
  Ignition_off = 'IN_PROGRESS',
  Disconnected = 'Disconnected',
  No_Signal = 'No_Signal',
}
