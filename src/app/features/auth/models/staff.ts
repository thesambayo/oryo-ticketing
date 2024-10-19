export interface Staff {
  id: number;
  created_at: string;
  name: string;
  email: string;
  activated: boolean;
  department: StaffDepartment;
	permissions: string[];
}

export interface StaffDepartment {
  id: number;
  name: Department;
}

export enum Department {
  'DIGITAL_PRODUCTS' = 'Digital products',
  'BUSINESS_DEVELOPMENT' = 'Business development',
  'HR' = 'HR',
  'FINANCE' = 'Finance',
  'ENGINEERING' = 'Engineering',
  'PROCUREMENT' = 'Procurement',
}
