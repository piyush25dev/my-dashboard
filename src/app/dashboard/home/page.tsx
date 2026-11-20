'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StatsCard from '@/Components/StatsCard';
import RecentOrders from '@/Components/RecentOrders';
import OrderStatusCard from '@/Components/OrderStatusCard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

export default function DashboardPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* The change values below are sample data. Replace them with real figures, or remove the props. */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Total users"
            value="1,254"
            icon={<PeopleAltOutlinedIcon fontSize="inherit" />}
            color="primary"
            change="8.2%"
            trend="up"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Total orders"
            value="324"
            icon={<ShoppingCartOutlinedIcon fontSize="inherit" />}
            color="success"
            change="3.1%"
            trend="up"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Total revenue"
            value="$12,345"
            icon={<PaymentsOutlinedIcon fontSize="inherit" />}
            color="secondary"
            change="1.4%"
            trend="down"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Growth"
            value="+12%"
            icon={<TrendingUpRoundedIcon fontSize="inherit" />}
            color="warning"
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentOrders />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <OrderStatusCard />
        </Grid>
      </Grid>
    </Box>
  );
}