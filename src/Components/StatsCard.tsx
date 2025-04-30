import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    color?: string;
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
    return (
        <Card sx={{ boxShadow: '0 2px 4px rgba(74, 169, 247, 0.3)', transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out", borderRadius: 3, "&:hover": { boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)', transform: "scale(1.03)", } }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="h2">
                            {value}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            color: color || 'primary.main',
                            fontSize: '2.5rem',
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}