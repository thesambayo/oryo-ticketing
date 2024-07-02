import { HlmBadgeVariant } from "@spartan-ng/ui-badge-helm";

export interface TicketItem {
  id: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  subject: string;
  priority: TicketItemPriority;
  status: TicketItemStatus
  description: string;
  attachments: string[];
  dateCreated: string;
  dateResolved: string;
}

export enum TicketItemStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export const statusDisplay: { [key in TicketItemStatus]: string } = {
  [TicketItemStatus.OPEN]: 'Open',
  [TicketItemStatus.IN_PROGRESS]: 'In Progress',
  [TicketItemStatus.CLOSED]: 'Closed',
  [TicketItemStatus.RESOLVED]: 'Resolved',
  [TicketItemStatus.CANCELLED]: 'Cancelled',
};

export function getDisplayStatus(status?: string): string {
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

export function getDisplayPriority(priority?: string): string {
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