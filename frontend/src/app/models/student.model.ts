export interface Student {
  id?: number;
  student_name: string;
  city: string;
  address: string;
  birth_date: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
  count?: number;
}