// import { TicketItem, TicketItemPriority, TicketItemStatus } from "";

import { LeadStatus, Lead } from "./models/bdm-item";

export const bdmItems: Lead[] = [
  {
    id: 1,
    name: "John INC",
    email: "johndoe@example.com",
    customerName: "John Doe",
    phone: "08112345678",
    location: "Issue with login",
    status: LeadStatus.LEAD,
    product_offered: "Unable to login with the provided credentials.",
    created_by: "",
    updated_by: "2024-07-01T10:30:00Z",
    created_at: "",
    updated_at: ""
  },
  {
    id: 2,
    name: "Jane INC",
    email: "janesmith@example.com",
    customerName: "Jane Smith",
    phone: "08112345678",
    location: "Tech Solutions",
    status: LeadStatus.LEAD,
    product_offered: "Payment gateway error",
    created_by: "",
    updated_by: "2024-07-01T10:30:00Z",
    created_at: "",
    updated_at: ""
  },
  {
    id: 3,
    name: "Mike INC",
    email: "mikejohnson@example.com",
    customerName: "Mike Johnson",
    phone: "08112345678",
    location: "Innovatech",
    status: LeadStatus.LEAD,
    product_offered: "Feature request for dashboard",
    created_by: "",
    updated_by: "2024-07-01T10:30:00Z",
    created_at: "",
    updated_at: ""
  },
  {
    id: 4,
    name: "Emily INC",
    email: "emilydavis@example.com",
    customerName: "Emily Davis",
    phone: "08112345678",
    location: "BizWorks",
    status: LeadStatus.LEAD,
    product_offered: "Slow performance on app",
    created_by: "",
    updated_by: "2024-07-01T10:30:00Z",
    created_at: "",
    updated_at: ""
  }
];
