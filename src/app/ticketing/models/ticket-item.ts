import { HlmBadgeVariant } from "@spartan-ng/ui-badge-helm";

export interface TicketItem {
  id: string;
  ticketId: string;
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

// add to a mock service
// protected _tickets: TicketItem[] = [
//   {
//     id: 'T001',
//     customerName: 'John Doe',
//     customerEmail: 'john.doe@example.com',
//     companyName: 'ABC Company',
//     subject: 'Issue with login',
//     priority: TicketItemPriority.URGENT,
//     status: TicketItemStatus.OPEN,
//     description: 'I am unable to login to my account.',
//     attachments: ['file1.pdf', 'file2.png'],
//     dateCreated: '2022-01-01',
//     dateResolved: ''
//   },
//   {
//     id: 'T002',
//     customerName: 'Jane Smith',
//     customerEmail: 'jane.smith@example.com',
//     companyName: 'XYZ Corporation',
//     subject: 'Payment not processed',
//     priority: TicketItemPriority.MEDIUM,
//     status: TicketItemStatus.IN_PROGRESS,
//     description: 'I made a payment but it has not been processed yet.',
//     attachments: [],
//     dateCreated: '2022-01-02',
//     dateResolved: ''
//   },
//   {
//     id: 'T003',
//     customerName: 'Mike Johnson',
//     customerEmail: 'mike.johnson@example.com',
//     companyName: '123 Industries',
//     subject: 'Product not delivered',
//     priority: TicketItemPriority.LOW,
//     status: TicketItemStatus.CANCELLED,
//     description: 'I ordered a product but it has not been delivered yet.',
//     attachments: ['file3.docx'],
//     dateCreated: '2022-01-03',
//     dateResolved: ''
//   },
//   {
//     id: 'T004',
//     customerName: 'Sarah Williams',
//     customerEmail: 'sarah.williams@example.com',
//     companyName: 'ABC Company',
//     subject: 'Bug in the system',
//     priority: TicketItemPriority.HIGH,
//     status: TicketItemStatus.RESOLVED,
//     description: 'I found a bug in the system.',
//     attachments: [],
//     dateCreated: '2022-01-04',
//     dateResolved: '2022-01-05'
//   },
//   {
//     id: 'T005',
//     customerName: 'David Brown',
//     customerEmail: 'david.brown@example.com',
//     companyName: 'XYZ Corporation',
//     subject: 'Feature request',
//     priority: TicketItemPriority.MEDIUM,
//     status: TicketItemStatus.CLOSED,
//     description: 'I have a feature request for the application.',
//     attachments: ['file4.jpg', 'file5.txt'],
//     dateCreated: '2022-01-05',
//     dateResolved: '2022-01-06'
//   }
// ];