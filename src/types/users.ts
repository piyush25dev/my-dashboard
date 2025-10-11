// types/user.ts
export type Role = 'SuperAdmin' | 'Admin' | 'Editor' | 'Viewer';
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
  createdBy?: string; // Track who created this user
}