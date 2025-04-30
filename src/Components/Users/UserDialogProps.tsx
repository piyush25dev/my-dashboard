'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Chip,
} from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';

// Types
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

export type NewUser = Omit<User, 'id' | 'lastLogin' | 'joinDate'>;

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User | NewUser) => void;
  user?: User | null; // If provided, we're in edit mode
  mode: 'add' | 'edit';
}

const roleColors: Record<Role, ChipProps['color']> = {
  Admin: 'primary',
  Editor: 'secondary',
  Viewer: 'info',
};

const statusColors: Record<Status, ChipProps['color']> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
};

export default function UserDialog({ open, onClose, onSave, user, mode }: UserDialogProps) {
  const isEditMode = mode === 'edit';
  
  const [formData, setFormData] = useState<NewUser & Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Viewer',
    status: 'active',
    ...(user && { id: user.id, lastLogin: user.lastLogin, joinDate: user.joinDate }),
  });

  const [errors, setErrors] = useState({
    email: false,
  });

  // Update form data when user prop changes (in edit mode)
  useEffect(() => {
    if (isEditMode && user) {
      setFormData({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin,
        joinDate: user.joinDate,
      });
    }
  }, [user, isEditMode]);

  const handleChange = (field: keyof (User | NewUser), value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate email on change
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prev => ({ ...prev, email: !emailRegex.test(value) }));
    }
  };

  const handleSubmit = () => {
    if (!errors.email) {
      onSave(formData);
      onClose();
      
      // Reset form only if in add mode
      if (!isEditMode) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          role: 'Viewer',
          status: 'active',
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            error={errors.email}
            helperText={errors.email ? 'Please enter a valid email address' : ''}
          />
          <TextField
            select
            label="Role"
            variant="outlined"
            fullWidth
            name="role"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value as Role)}
          >
            {Object.entries(roleColors).map(([role, color]) => (
              <MenuItem key={role} value={role}>
                <Chip
                  label={role}
                  color={color}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                />
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            variant="outlined"
            fullWidth
            name="status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as Status)}
          >
            {Object.entries(statusColors).map(([status, color]) => (
              <MenuItem key={status} value={status}>
                <Chip
                  label={status}
                  color={color}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                />
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={
            !formData.firstName || 
            !formData.lastName || 
            !formData.email || 
            errors.email
          }
        >
          {isEditMode ? 'Save Changes' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}