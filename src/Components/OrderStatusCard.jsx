'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { orders, ORDER_STATUSES, statusColor } from '@/data/orders';

export default function OrderStatusCard() {
  const total = orders.length;
  const rows = ORDER_STATUSES.map((status) => {
    const count = orders.filter((o) => o.status === status).length;
    return { status, count, percent: total ? Math.round((count / total) * 100) : 0 };
  });

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Orders by status" subheader="Based on your recent orders" sx={{ pb: 1 }} />
      <CardContent>
        <Box display="flex" alignItems="baseline" gap={1} mb={2}>
          <Typography variant="h2" component="p" sx={{ fontSize: '1.875rem', fontVariantNumeric: 'tabular-nums' }}>
            {total}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            orders
          </Typography>
        </Box>

        {/* Segmented bar */}
        <Box
          role="img"
          aria-label={rows.map((r) => `${r.status}: ${r.count}`).join(', ')}
          sx={{ display: 'flex', gap: '3px', height: 10, mb: 3 }}
        >
          {rows
            .filter((r) => r.count > 0)
            .map((r) => (
              <Box
                key={r.status}
                sx={{ flex: r.count, borderRadius: '5px', bgcolor: `${statusColor[r.status]}.main` }}
              />
            ))}
        </Box>

        <Stack spacing={1.75}>
          {rows.map((r) => (
            <Box key={r.status} display="flex" alignItems="center" gap={1.25}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: `${statusColor[r.status]}.main` }} />
              <Typography variant="body2" sx={{ flex: 1 }}>
                {r.status}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {r.count}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ width: 36, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
              >
                {r.percent}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}