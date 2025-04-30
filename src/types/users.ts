export type Role = 'Admin' | 'Editor' | 'Viewer';
export type Status = 'active' | 'inactive' | 'pending';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: string;
  joinDate: string;
}