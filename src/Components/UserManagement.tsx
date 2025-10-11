// components/UserManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  AdminPanelSettings as SuperAdminIcon,
  Security as AdminIcon,
  EditNote as EditorIcon,
  Visibility as ViewerIcon,
} from '@mui/icons-material';
import { User, Role, Status } from '@/types/users';
import { useAuth } from '@/context/AuthContext';

// Mock data for users
const initialUsers: User[] = [
  {
    id: 1,
    firstName: 'Super',
    lastName: 'Admin',
    email: 'superadmin@example.com',
    role: 'SuperAdmin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    joinDate: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Admin',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    joinDate: '2024-01-02T00:00:00Z',
    createdBy: 'superadmin'
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Editor',
    email: 'editor@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-13T09:15:00Z',
    joinDate: '2024-01-03T00:00:00Z',
    createdBy: 'superadmin'
  }
];

const UserManagement = () => {
  const { userData, hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Viewer' as Role,
    status: 'active' as Status
  });

  const isSuperAdmin = userData?.role === 'SuperAdmin';

  useEffect(() => {
    if (!hasPermission('Admin')) {
      return;
    }
  }, [hasPermission]);

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'Viewer',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSubmit = () => {
    if (editingUser) {
      // Update user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        lastLogin: new Date().toISOString(),
        joinDate: new Date().toISOString(),
        createdBy: userData?.username
      };
      setUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'SuperAdmin':
        return <SuperAdminIcon />;
      case 'Admin':
        return <AdminIcon />;
      case 'Editor':
        return <EditorIcon />;
      case 'Viewer':
        return <ViewerIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'SuperAdmin':
        return 'error';
      case 'Admin':
        return 'warning';
      case 'Editor':
        return 'info';
      case 'Viewer':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (!hasPermission('Admin')) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        You don&apos;t have permission to access this section.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4" component="div">
                {users.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Super Admins
              </Typography>
              <Typography variant="h4" component="div" color="error.main">
                {users.filter(u => u.role === 'SuperAdmin').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Admins
              </Typography>
              <Typography variant="h4" component="div" color="warning.main">
                {users.filter(u => u.role === 'Admin').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {users.filter(u => u.status === 'active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        {isSuperAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add User
          </Button>
        )}
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Join Date</TableCell>
              {isSuperAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="body1">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getRoleIcon(user.role)}
                    label={user.role}
                    color={getRoleColor(user.role)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={getStatusColor(user.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.lastLogin).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleDateString()}
                </TableCell>
                {isSuperAdmin && (
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(user)}
                      color="primary"
                      disabled={user.role === 'SuperAdmin' && user.email !== userData?.email}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      color="error"
                      disabled={user.role === 'SuperAdmin' || user.email === userData?.email}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </Grid>
              <Grid size={{xs: 12}}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    label="Role"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                  >
                    <MenuItem value="Viewer">Viewer</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    {isSuperAdmin && <MenuItem value="SuperAdmin">Super Admin</MenuItem>}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;