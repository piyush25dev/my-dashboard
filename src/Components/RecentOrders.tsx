'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { orders, statusColor, OrderStatus } from '@/data/orders';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Order',
    width: 90,
    renderCell: (params) => (
      <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
        #{params.value}
      </Typography>
    ),
  },
  {
    field: 'customer',
    headerName: 'Customer',
    flex: 1.4,
    minWidth: 180,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, height: '100%' }}>
        <Avatar
          sx={(theme) => ({
            width: 28,
            height: 28,
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.18),
          })}
        >
          {initials(params.value)}
        </Avatar>
        <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Typography variant="body2" color="text.secondary">
        {new Date(params.value).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC',
        })}
      </Typography>
    ),
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 110,
    align: 'right',
    headerAlign: 'right',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        ${Number(params.value).toLocaleString('en-US')}
      </Typography>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
      const color = statusColor[params.value as OrderStatus] ?? 'info';
      return (
        <Box
          sx={(theme) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1,
            py: 0.25,
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: `${color}.main`,
            bgcolor: alpha(theme.palette[color].main, theme.palette.mode === 'light' ? 0.1 : 0.16),
          })}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'currentColor' }} />
          {params.value}
        </Box>
      );
    },
  },
];

export default function RecentOrders() {
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  return (
    <Card sx={{ height: '100%', overflow: 'hidden' }}>
      <CardHeader
        title="Recent orders"
        subheader="The latest orders from your customers"
        sx={{ pb: 2 }}
        action={
          <Button component={Link} href="/dashboard/orders" size="small">
            View all
          </Button>
        }
      />
      <DataGrid
        rows={orders}
        columns={columns}
        autoHeight
        rowHeight={56}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10]}
        sx={(theme) => ({
          border: 0,
          borderRadius: 0,
          '--DataGrid-containerBackground': theme.palette.background.default,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.default,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: '0.75rem',
            fontWeight: 600,
            color: theme.palette.text.secondary,
          },
          '& .MuiDataGrid-columnSeparator': { display: 'none' },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            borderColor: theme.palette.divider,
          },
          '& .MuiDataGrid-row:hover': { backgroundColor: theme.palette.action.hover },
          '& .MuiDataGrid-footerContainer': { borderColor: theme.palette.divider },
          // Keep a visible focus ring for keyboard users
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': { outline: 'none' },
          '& .MuiDataGrid-cell:focus-visible, & .MuiDataGrid-columnHeader:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: -2,
          },
        })}
      />
    </Card>
  );
}