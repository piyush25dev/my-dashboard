// import UsersPage from '@/Components/Users/UsersIndex'
// import React from 'react'

// export default function page() {
//   return (
//     <div>
//       <UsersPage/>
//     </div>
//   )
// }


// // app/dashboard/users/page.tsx
'use client';

import { Box, Typography, Alert } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import UserManagement from '@/Components/UserManagement';

export default function UsersPage() {
  const { hasPermission } = useAuth();

  if (!hasPermission('Admin')) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        You don&apos;t have permission to access user management.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>
      <UserManagement />
    </Box>
  );
}