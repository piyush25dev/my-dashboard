'use client';

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { users as initialUsers } from '@/data/users';
import UserDialog from './UserDialogProps';

// Types - make sure these match exactly with UserDialog
type Role = 'Admin' | 'Editor' | 'Viewer';
type Status = 'active' | 'inactive' | 'pending';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: string;
  joinDate: string;
}

type NewUser = Omit<User, 'id' | 'lastLogin' | 'joinDate'>;

const statusColors: Record<Status, ChipProps['color']> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
};

const roleColors: Record<Role, ChipProps['color']> = {
  Admin: 'primary',
  Editor: 'secondary',
  Viewer: 'info',
};

const columns = (handleEditClick: (user: User) => void): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    renderCell: (params: GridRenderCellParams<User>) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar>
          {params.row.firstName.charAt(0)}
          {params.row.lastName.charAt(0)}
        </Avatar>
        <div>
          <Typography variant="body1" fontWeight="medium">
            {params.row.firstName} {params.row.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row.email}
          </Typography>
        </div>
      </Stack>
    ),
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
    renderCell: (params: GridRenderCellParams<User>) => (
      <Chip
        label={params.value}
        color={roleColors[params.value as Role] || 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params: GridRenderCellParams<User>) => (
      <Chip
        label={params.value}
        color={statusColors[params.value as Status] || 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    width: 180,
  },
  {
    field: 'joinDate',
    headerName: 'Join Date',
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<User>) => (
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
        <Button variant="outlined" size="small" color="error">
          Delete
        </Button>
      </Stack>
    ),
  },
];

export default function UsersPage() {
  const [searchText, setSearchText] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  
  // Ensure initial users conform to our User type
  const typedInitialUsers = initialUsers.map(user => ({
    ...user,
    role: user.role as Role,
    status: user.status as Status
  }));
  
  const [users, setUsers] = useState<User[]>(typedInitialUsers);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddUser = (newUser: NewUser) => {
    const userToAdd: User = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      lastLogin: new Date().toISOString(),
      joinDate: new Date().toISOString(),
    };
    setUsers([...users, userToAdd]);
  };

  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setOpenEditDialog(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <UserDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSave={handleAddUser}
        mode="add"
      />

      {currentUser && (
        <UserDialog
          open={openEditDialog}
          onClose={() => {
            setOpenEditDialog(false);
            setCurrentUser(null);
          }}
          onSave={handleUpdateUser as (user: User | NewUser) => void}
          user={currentUser}
          mode="edit"
        />
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add User
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns(handleEditClick)}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            background: "#fff",
            boxShadow: '0 5px 15px 5px rgba(74, 169, 247, 0.3)',
            borderRadius: 3,
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
          }}
        />
      </Box>
    </Box>
  );
}