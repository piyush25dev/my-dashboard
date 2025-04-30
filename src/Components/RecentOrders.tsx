import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'customer', headerName: 'Customer', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'amount', headerName: 'Amount', width: 90 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Box
        sx={{
          color: params.value === 'Delivered' ? 'success.main' : 'warning.main',
          fontWeight: 'bold',
        }}
      >
        {params.value}
      </Box>
    ),
  },
];

const rows = [
  { id: 1, customer: 'John Doe', date: '2023-05-01', amount: 120, status: 'Delivered' },
  { id: 2, customer: 'Jane Smith', date: '2023-05-02', amount: 80, status: 'Processing' },
  { id: 3, customer: 'Robert Johnson', date: '2023-05-03', amount: 210, status: 'Delivered' },
  { id: 4, customer: 'Emily Davis', date: '2023-05-04', amount: 65, status: 'Cancelled' },
  { id: 5, customer: 'Michael Brown', date: '2023-05-05', amount: 175, status: 'Delivered' },
];

export default function RecentOrders() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  return (
    <Box sx={{ mt: 2, }}>
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[3, 5, 10]}
        checkboxSelection
        sx={{
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
  );
}