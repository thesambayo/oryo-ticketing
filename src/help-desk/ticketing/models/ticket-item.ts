import { HlmBadgeVariant } from "@spartan-ng/ui-badge-helm";

export interface NullableTime {
	Time: string;
	Valid: boolean;
}
export interface TicketItem {
	id: number;
	reporterName: string;
	reporterEmail: string;
	reporterCompany: string;
	priority: TicketItemPriority;
	status: TicketItemStatus;
	category: string;
	subject: string;
	description: string;
	expectedResolvedAt: NullableTime;
	assigneeId: number;
	assigneeName: string;
	assigneeEmail: string;
	createdAt: string;
	updatedAt: string;
	resolvedAt: NullableTime;
	version: number;
}

export enum TicketItemStatus {
	OPEN = 'OPEN',
	CLOSED = 'CLOSED',
	CANCELLED = 'CANCELLED',
	IN_PROGRESS = 'IN_PROGRESS',
	RESOLVED = 'RESOLVED',
	// OPEN = 1,
	// CLOSED,
	// CANCELLED,
	// IN_PROGRESS, 
	// RESOLVED 
	// update db to send name instead of id

}

export const statusDisplay: { [key in TicketItemStatus]: string } = {
	[TicketItemStatus.OPEN]: 'Open',
	[TicketItemStatus.IN_PROGRESS]: 'In Progress',
	[TicketItemStatus.CLOSED]: 'Closed',
	[TicketItemStatus.RESOLVED]: 'Resolved',
	[TicketItemStatus.CANCELLED]: 'Cancelled',
};

export function getDisplayStatus(status?: TicketItemStatus): string {
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
	URGENT = 'URGENT',
	HIGH = 'HIGH',
	MEDIUM = 'MEDIUM',
	LOW = 'LOW',
}

export const priorityDisplay: { [key in TicketItemPriority]: string } = {
	[TicketItemPriority.URGENT]: 'Urgent',
	[TicketItemPriority.HIGH]: 'High',
	[TicketItemPriority.MEDIUM]: 'Medium',
	[TicketItemPriority.LOW]: 'Low',
};

export function getDisplayPriority(priority?: TicketItemPriority): string {
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
	priority: TicketItemPriority; // set a default in db [can be within list of registered values]
	status: TicketItemStatus; // set a default in db [can be within list of registered values]

	subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
	description: string; // non empty and not more than 500 bytes long
	// minimum requirement to create a ticket above

	category: string; // incident, problem etc [can be within list of registered values]
	assignee?: number; // when not-empty is only an oryo email
	// assignee?: string; // when not-empty is only an oryo email
	// attachments?: string[]; later scatters
	// should have a created by field that when not-empty is only an oryo email
}

export interface UpdateTicketItemPayload {
	reporterName?: string;
	reporterEmail?: string;
	reporterCompany?: string;
	priority?: TicketItemPriority;
	status?: TicketItemStatus;
	subject?: string;
	description?: string;
	category?: string;
	assignee?: number;
}
