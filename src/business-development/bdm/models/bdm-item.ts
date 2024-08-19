import { HlmBadgeVariant } from '@spartan-ng/ui-badge-helm';

export interface Lead {
  id: number;
  company: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  productsOffered: string;
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
  amount: number;
  startDate: string;
  endDate: string;
}

export interface CreateUserLeadsPayload {
  company: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  status: LeadStatus;
  productsOffered: ProductsOffered[];
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

// const products: productsOffered[] = [productsOffered.Engine_Control_Module, productsOffered.Fuel]

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

export enum ProductsOffered {
  Fleet_Management = 'FLEET',
  Vision = 'VISION',
  Engine_Control_Module = 'ENGINE_GENERATOR_MODULE',
  Fuel = 'FUEL',
}

export const productOfferedDisplay: { [key in ProductsOffered]: string } = {
  [ProductsOffered.Fleet_Management]: 'Fleet',
  [ProductsOffered.Engine_Control_Module]: 'Enginer control',
  [ProductsOffered.Fuel]: 'Fuel',
  [ProductsOffered.Vision]: 'Vision',
};

export const productsOfferedArray = [
  {
    value: ProductsOffered.Fleet_Management,
    label: productOfferedDisplay[ProductsOffered.Fleet_Management]
  },{
    value: ProductsOffered.Vision,
    label: productOfferedDisplay[ProductsOffered.Vision]
  },{
    value: ProductsOffered.Engine_Control_Module,
    label: productOfferedDisplay[ProductsOffered.Engine_Control_Module]
  },{
    value: ProductsOffered.Fuel,
    label: productOfferedDisplay[ProductsOffered.Fuel]
  },
]

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
