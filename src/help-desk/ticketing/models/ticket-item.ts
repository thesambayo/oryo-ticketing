import { HlmBadgeVariant } from "@spartan-ng/ui-badge-helm";

export interface TicketItem {
  id: string;
  reporterName: string;
  reporterEmail: string;
  reporterCompany: string;
  priorityId: TicketItemPriority;
  statusId: TicketItemStatus;
  subject: string;
  description: string;
  category: string;
  assigneeId: number;

  createdAt: string;
  resolvedAt?: string;
  updatedAt?: string;
	version: number;

	// "id": 8,
	// "reporterName": "Samuel adebayo",
	// "reporterEmail": "sambayo28@gmail.com",
	// "reporterCompany": "Samuel's inc",
	// "priorityId": 2,
	// "statusId": 2,
	// "subject": "fuel logs",
	// "description": "We have not been getting fuel logs for the past two days",
	// "category": "problem",
	// "createdAt": "2024-07-23T05:35:40+01:00",
	// "assigneeId": 1,
	// "version": 1
}

export enum TicketItemStatus {
  OPEN = 1,
  CLOSED,
  CANCELLED,
  IN_PROGRESS, 
  RESOLVED 
	// update db to send name instead of id
  // OPEN = 'OPEN',
  // CLOSED = 'CLOSED',
  // CANCELLED = 'CANCELLED',
  // IN_PROGRESS = 'IN_PROGRESS',
  // RESOLVED = 'RESOLVED',
}

export const statusDisplay: { [key in TicketItemStatus]: string } = {
  [TicketItemStatus.OPEN]: 'Open',
  [TicketItemStatus.IN_PROGRESS]: 'In Progress',
  [TicketItemStatus.CLOSED]: 'Closed',
  [TicketItemStatus.RESOLVED]: 'Resolved',
  [TicketItemStatus.CANCELLED]: 'Cancelled',
};

export function getDisplayStatus(status?: number): string {
  return status ? statusDisplay[status as keyof typeof statusDisplay] : '';
}

export function getStatusVariant(status: TicketItemStatus): HlmBadgeVariant {
  switch (status) {
    case TicketItemStatus.CLOSED:
      return 'secondary';
    case TicketItemStatus.CANCELLED:
      return 'destructive';
    case TicketItemStatus.RESOLVED:
      return 'success';
    case TicketItemStatus.IN_PROGRESS:
      return 'info';
    default:
      return 'warning';
  }
}


export enum TicketItemPriority {
  URGENT = 1,
  HIGH,
  MEDIUM,
  LOW,
}

export const priorityDisplay: { [key in TicketItemPriority]: string } = {
  [TicketItemPriority.URGENT]: 'Urgent',
  [TicketItemPriority.HIGH]: 'High',
  [TicketItemPriority.MEDIUM]: 'Medium',
  [TicketItemPriority.LOW]: 'Low',
};

export function getDisplayPriority(priority?: number): string {
  return priority ? priorityDisplay[priority as keyof typeof priorityDisplay] : '';
}

export function getPriorityVariant(priority: TicketItemPriority): HlmBadgeVariant {
  switch (priority) {
    case TicketItemPriority.HIGH:
      return 'warning';
    case TicketItemPriority.LOW:
      return 'outline';
    case TicketItemPriority.MEDIUM:
      return 'secondary';
    default:
      return 'destructive';
  }
}

export interface CreateTicketItemPayload {
  // with validation for BE
  reporterName: string; // non empty
  reporterEmail: string; // non empty and is an email
  reporterCompany: string; // non-empty
  priority?: TicketItemPriority; // set a default in db [can be within list of registered values]
  status?: TicketItemStatus; // set a default in db [can be within list of registered values]

  subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
  description: string; // non empty and not more than 500 bytes long
  // minimum requirement to create a ticket above

  category?: string; // incident, problem etc [can be within list of registered values]
  assignee?: number; // when not-empty is only an oryo email
  // assignee?: string; // when not-empty is only an oryo email
  // attachments?: string[]; later scatters
  // should have a created by field that when not-empty is only an oryo email
}
// export interface CreateTicketItemPayload {
//   // with validation for BE
//   reporterName: string; // non empty
//   reporterEmail: string; // non empty and is an email
//   reporterCompany: string; // non-empty
//   priority?: TicketItemPriority; // set a default in db [can be within list of registered values]
//   status?: TicketItemStatus; // set a default in db [can be within list of registered values]

//   subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
//   description: string; // non empty and not more than 500 bytes long
//   // minimum requirement to create a ticket above

//   category?: string; // incident, problem etc [can be within list of registered values]
//   attachments?: string[];
//   assignee?: string; // when not-empty is only an oryo email
//   // should have a created by field that when not-empty is only an oryo email
// }
