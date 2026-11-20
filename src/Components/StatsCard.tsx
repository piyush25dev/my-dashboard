import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { ReactNode } from 'react';

type StatColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  /** Theme palette key, so the card follows light and dark mode */
  color?: StatColor;
  /** Optional change, e.g. "8.2%" */
  change?: string;
  trend?: 'up' | 'down';
  changeLabel?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color = 'primary',
  change,
  trend = 'up',
  changeLabel = 'vs last month',
}: StatsCardProps) {
  const isUp = trend === 'up';
  const TrendIcon = isUp ? ArrowUpwardRoundedIcon : ArrowDownwardRoundedIcon;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, pt: 0.5 }}>
            {title}
          </Typography>
          <Box
            sx={(theme) => ({
              width: 40,
              height: 40,
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '10px',
              fontSize: '1.375rem',
              color: `${color}.main`,
              bgcolor: alpha(theme.palette[color].main, theme.palette.mode === 'light' ? 0.1 : 0.16),
            })}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="h2"
          component="p"
          sx={{ mt: 1.5, fontSize: '1.875rem', fontVariantNumeric: 'tabular-nums' }}
        >
          {value}
        </Typography>

        {change && (
          <Box display="flex" alignItems="center" gap={1} mt={1.5}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.25,
                px: 0.75,
                py: 0.25,
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: isUp ? 'success.main' : 'error.main',
                bgcolor: (theme) =>
                  alpha(
                    isUp ? theme.palette.success.main : theme.palette.error.main,
                    theme.palette.mode === 'light' ? 0.1 : 0.16,
                  ),
              }}
            >
              <TrendIcon sx={{ fontSize: 14 }} />
              {change}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {changeLabel}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}