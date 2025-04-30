'use client';

import { useState } from 'react';
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

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    status: Status;
  }) => void;
}

export default function AddUserDialog({ open, onClose, onSave }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Viewer' as Role,
    status: 'active' as Status,
  });

  const [errors, setErrors] = useState({
    email: false,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
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
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'Viewer',
        status: 'active',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
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
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Define these in a separate types file (src/types/users.ts)
type Role = 'Admin' | 'Editor' | 'Viewer';
type Status = 'active' | 'inactive' | 'pending';

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