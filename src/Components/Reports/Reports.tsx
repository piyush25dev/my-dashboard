'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Chip, Stack, Button, Paper } from '@mui/material';
import { reports } from '@/data/reports';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useState } from 'react';
import { ChipProps } from '@mui/material/Chip';

// Define proper types for status
type ReportStatus = 'published' | 'draft' | 'archived';

const statusColors: Record<ReportStatus, ChipProps['color']> = {
    published: 'success',
    draft: 'warning',
    archived: 'error',
};

const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Report Title',
        flex: 2,
        minWidth: 200,
        renderCell: (params) => (
            <Stack direction="row" alignItems="center" spacing={2}>
                <InsertChartIcon color="primary" />
                <div>
                    <Typography variant="body1" fontWeight="medium">
                        {params.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {params.row.category}
                    </Typography>
                </div>
            </Stack>
        ),
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: (params) => (
            <Chip
                label={params.value}
                color={statusColors[params.value as ReportStatus]}
                size="small"
                sx={{ textTransform: 'capitalize' }}
            />
        ),
    },
    {
        field: 'views',
        headerName: 'Views',
        width: 100,
        renderCell: (params) => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <VisibilityIcon fontSize="small" color="action" />
                <Typography>{params.value}</Typography>
            </Stack>
        ),
    },
    {
        field: 'downloads',
        headerName: 'Downloads',
        width: 120,
        renderCell: (params) => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <DownloadIcon fontSize="small" color="action" />
                <Typography>{params.value}</Typography>
            </Stack>
        ),
    },
    {
        field: 'lastUpdated',
        headerName: 'Last Updated',
        width: 150,
        // valueGetter: (params: GridValueGetterParams) => 
        //   params.row.lastUpdated ? new Date(params.row.lastUpdated).toLocaleDateString() : '',
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: () => (
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small">
                    View
                </Button>
                <Button variant="outlined" size="small" color="secondary">
                    Export
                </Button>
            </Stack>
        ),
    },
];

export default function ReportsPage() {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Reports
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" startIcon={<DownloadIcon />}>
                        Export All
                    </Button>
                    <Button variant="contained" color="secondary">
                        Create Report
                    </Button>
                </Stack>
            </Box>

            <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: '2px 2px 5px 2px rgba(74, 169, 247, 0.3)', }}>
                <Typography variant="h6" gutterBottom>
                    Quick Stats
                </Typography>
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 2}}>
                    <StatCard
                        title="Total Reports"
                        value={reports.length}
                        icon={<InsertChartIcon color="primary" />}
                    />
                    <StatCard
                        title="Published"
                        value={reports.filter(r => r.status === 'published').length}
                        icon={<InsertChartIcon color="success" />}
                    />
                    <StatCard
                        title="Total Views"
                        value={reports.reduce((sum, report) => sum + report.views, 0)}
                        icon={<VisibilityIcon color="info" />}
                    />
                    <StatCard
                        title="Total Downloads"
                        value={reports.reduce((sum, report) => sum + report.downloads, 0)}
                        icon={<DownloadIcon color="warning" />}
                    />
                </Box>
            </Paper>

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={reports}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25]}
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

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Paper
            sx={{
                p: 2,
                // minWidth: 180,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                boxShadow: '0 2px 4px rgba(74, 169, 247, 0.3)', transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out", "&:hover": { boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)', transform: "scale(1.03)", }
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'action.hover',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </Box>
            <div>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {value.toLocaleString()}
                </Typography>
            </div>
        </Paper>
    );
}