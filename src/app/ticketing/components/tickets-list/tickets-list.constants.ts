import { TicketItem, TicketItemPriority, TicketItemStatus } from "../../models/ticket-item";

export const ticketItems: TicketItem[] = [
  {
    id: "1",
    ticketId: "TCKT-001",
    customerName: "John Doe",
    customerEmail: "johndoe@example.com",
    companyName: "Example Corp",
    subject: "Issue with login",
    priority: TicketItemPriority.HIGH,
    status: TicketItemStatus.OPEN,
    description: "Unable to login with the provided credentials.",
    attachments: ["screenshot1.png"],
    dateCreated: "2024-07-01T10:30:00Z",
    dateResolved: ""
  },
  {
    id: "2",
    ticketId: "TCKT-002",
    customerName: "Jane Smith",
    customerEmail: "janesmith@example.com",
    companyName: "Tech Solutions",
    subject: "Payment gateway error",
    priority: TicketItemPriority.URGENT,
    status: TicketItemStatus.IN_PROGRESS,
    description: "Receiving an error message when trying to process payments.",
    attachments: ["errorlog.txt", "screenshot2.png"],
    dateCreated: "2024-07-02T11:00:00Z",
    dateResolved: ""
  },
  {
    id: "3",
    ticketId: "TCKT-003",
    customerName: "Mike Johnson",
    customerEmail: "mikejohnson@example.com",
    companyName: "Innovatech",
    subject: "Feature request for dashboard",
    priority: TicketItemPriority.MEDIUM,
    status: TicketItemStatus.RESOLVED,
    description: "Request to add a new chart to the dashboard.",
    attachments: [],
    dateCreated: "2024-06-28T09:15:00Z",
    dateResolved: "2024-07-03T14:30:00Z"
  },
  {
    id: "4",
    ticketId: "TCKT-004",
    customerName: "Emily Davis",
    customerEmail: "emilydavis@example.com",
    companyName: "BizWorks",
    subject: "Slow performance on app",
    priority: TicketItemPriority.LOW,
    status: TicketItemStatus.CLOSED,
    description: "The application is running slower than usual.",
    attachments: ["performance_report.pdf"],
    dateCreated: "2024-06-25T08:45:00Z",
    dateResolved: "2024-07-01T16:00:00Z"
  }
];
