import { HlmBadgeVariant } from '@spartan-ng/ui-badge-helm';

export interface Lead {
  id: number;
  name: string;
  email: string;
  customerName: string;
  phone: string;
  location: string;
  product_offered: string;
  status: LeadStatus; // LEAD, OPPORTUNITY, KIV, PROJECT, NOT_INTERESTED, POC
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: number;
  staff_assigned: string;
  target: number;
  won: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}
export interface BudgetPayload {
  budget: string;
  projectValue: string;
  negotationValue: string;
  paymentValue: string;
  oustandingBalance: string;
  generatedInvoice: string;
}

export interface Won {
  // id: number;
  name: string;
  description: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserBudgetPayload {
  staffId: number;
  budget: string;
  startDate: string;
  endDate: string;
}
export interface CreateActivityPayload {
  // with validation for BE
  description: string;
  siteSurvey: string;
  schematicDesigns: string;
  technicalProposal: string;
  commercials: string;
  purchaseOrder: string;
}
export function getDisplayStatus(status?: LeadStatus): string {
  return status ? statusDisplay[status as keyof typeof statusDisplay] : '';
}

export enum LeadStatus {
  LEAD = 'LEAD',
  OPPORTUNITY = 'OPPORTUNITY',
  KIV = 'KIV',
  PROJECT = 'PROJECT',
  NOT_INTERESTED = 'NOT_INTERESTED',
  POC = 'POC',
}

export const statusDisplay: { [key in LeadStatus]: string } = {
  [LeadStatus.LEAD]: 'Open',
  [LeadStatus.OPPORTUNITY]: 'In Progress',
  [LeadStatus.KIV]: 'Closed',
  [LeadStatus.PROJECT]: 'Resolved',
  [LeadStatus.NOT_INTERESTED]: 'Cancelled',
  [LeadStatus.POC]: 'Cancelled',
};

export function getStatusVariant(status: LeadStatus): HlmBadgeVariant {
  switch (status) {
    case LeadStatus.LEAD:
      return 'secondary';
    case LeadStatus.OPPORTUNITY:
      return 'destructive';
    case LeadStatus.KIV:
      return 'warning';
    case LeadStatus.PROJECT:
      return 'success';
    case LeadStatus.NOT_INTERESTED:
      return 'destructive';
    case LeadStatus.POC:
      return 'info';
    default:
      return 'warning';
  }
}

export interface Report {
  id: number;
  staffId: number;
  name: string;
  budget: number;
  negotationBudget: number;
  leads: number;
  opportunity: number;
  won: number; // LEAD, OPPORTUNITY, KIV, PROJECT, NOT_INTERESTED, POC
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}
