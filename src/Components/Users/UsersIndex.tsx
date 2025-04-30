'use client';

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { users } from '@/data/users';
import Chip, { ChipProps } from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

// Types
type Status = 'active' | 'inactive' | 'pending';
type Role = 'Admin' | 'Editor' | 'Viewer';

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

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role | string; // Loosen for safety
  status: Status | string;
  lastLogin: string;
  joinDate: string;
}

const columns: GridColDef[] = [
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
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" size="small">
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

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%' }}>
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
        <Button variant="contained" startIcon={<AddIcon />}>
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
          columns={columns}
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
