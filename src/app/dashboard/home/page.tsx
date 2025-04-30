"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StatsCard from '@/Components/StatsCard';
import RecentOrders from '@/Components/RecentOrders';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <StatsCard
              title="Total Users"
              value="1,254"
              icon={<PeopleIcon fontSize="inherit" />}
              color="#3f51b5"
            />
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <StatsCard
              title="Total Orders"
              value="324"
              icon={<ShoppingCartIcon fontSize="inherit" />}
              color="#4caf50"
            />
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <StatsCard
              title="Total Revenue"
              value="$12,345"
              icon={<AttachMoneyIcon fontSize="inherit" />}
              color="#f44336"
            />
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <StatsCard
              title="Growth"
              value="+12%"
              icon={<TrendingUpIcon fontSize="inherit" />}
              color="#ff9800"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{xs: 12, md: 8}}>
            <RecentOrders />
          </Grid>
          <Grid size={{xs: 12, md: 4}}>
            {/* Add another component here like a chart or activity feed */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}