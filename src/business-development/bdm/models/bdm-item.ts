import { HlmBadgeVariant } from '@spartan-ng/ui-badge-helm';

export interface TicketItem {
  id: string;
  reporterName: string;
  reporterEmail: string;
  reporterCompany: string;
  subject: string;
  description: string;
  priority: TicketItemPriority;
  status: TicketItemStatus;

  attachments: string[];
  dateCreated: string;
  dateResolved: string;
  assignee?: string;
  dateUpdated?: string;
  category?: string;
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
  return priority
    ? priorityDisplay[priority as keyof typeof priorityDisplay]
    : '';
}

export function getPriorityVariant(
  priority: TicketItemPriority
): HlmBadgeVariant {
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

export interface CreateItemPayload {
  // with validation for BE
  name: string;
  email: string;
  // branch: string;
  phone: string;
  location: string;
  pto: string;
  // reporterCompany: string; // non-empty
  // priority?: TicketItemPriority; // set a default in db [can be within list of registered values]
  // status?: TicketItemStatus; // set a default in db [can be within list of registered values]

  // subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
  // description: string; // non empty and not more than 500 bytes long
  // // minimum requirement to create a ticket above

  // category?: string; // incident, problem etc [can be within list of registered values]
  // attachments?: string[];
  // assignee?: string; // when not-empty is only an oryo email
  // should have a created by field that when not-empty is only an oryo email
}

export interface CreateViewPayload {
  // with validation for BE
  name: string;
  email: string;
  branch: string;
  phone: string;
  location: string;
  pto: string;
  // reporterCompany: string; // non-empty
  // priority?: TicketItemPriority; // set a default in db [can be within list of registered values]
  // status?: TicketItemStatus; // set a default in db [can be within list of registered values]

  // subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
  // description: string; // non empty and not more than 500 bytes long
  // // minimum requirement to create a ticket above

  // category?: string; // incident, problem etc [can be within list of registered values]
  // attachments?: string[];
  // assignee?: string; // when not-empty is only an oryo email
  // should have a created by field that when not-empty is only an oryo email
}
export interface CreateBudgetPayload {
  // with validation for BE
  budget: string;
  projectValue: string;
  negotationValue: string;
  paymentValue: string;
  oustandingBalance: string;
  generatedInvoice: string;
  // reporterCompany: string; // non-empty
  // priority?: TicketItemPriority; // set a default in db [can be within list of registered values]
  // status?: TicketItemStatus; // set a default in db [can be within list of registered values]

  // subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
  // description: string; // non empty and not more than 500 bytes long
  // // minimum requirement to create a ticket above

  // category?: string; // incident, problem etc [can be within list of registered values]
  // attachments?: string[];
  // assignee?: string; // when not-empty is only an oryo email
  // should have a created by field that when not-empty is only an oryo email
}
export interface CreateActivityPayload {
  // with validation for BE
  description: string;
  siteSurvey: string;
  schematicDesigns: string;
  technicalProposal: string;
  commercials: string;
  purchaseOrder: string;
  // reporterCompany: string; // non-empty
  // priority?: TicketItemPriority; // set a default in db [can be within list of registered values]
  // status?: TicketItemStatus; // set a default in db [can be within list of registered values]

  // subject: string; // fuel log, tank issue, gps, etc [can be within list of registered values]
  // description: string; // non empty and not more than 500 bytes long
  // // minimum requirement to create a ticket above

  // category?: string; // incident, problem etc [can be within list of registered values]
  // attachments?: string[];
  // assignee?: string; // when not-empty is only an oryo email
  // should have a created by field that when not-empty is only an oryo email
}
