// app/dashboard/super-admin/page.tsx
'use client';

import { Box, Typography, Alert } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import UserManagement from '@/Components/UserManagement';

export default function SuperAdminPage() {
  const { hasPermission } = useAuth();

  if (!hasPermission('SuperAdmin')) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        You don&apos;t have permission to access the Super Admin section.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Super Admin Panel
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Full administrative access to manage all users and system settings.
      </Typography>
      
      <UserManagement />
    </Box>
  );
}