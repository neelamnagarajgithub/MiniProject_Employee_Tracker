export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string;
  hire_date: string;
  salary: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string;
  hire_date: string;
  salary: number;
}