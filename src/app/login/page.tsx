'use client';

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { keyframes } from '@mui/system';
import {
  DashboardRounded as LogoIcon,
  PersonOutlineRounded as PersonIcon,
  LockOutlined as LockIcon,
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
} from '@mui/icons-material';

// Change this to your product name
const BRAND_NAME = 'Dashboard';

// Demo accounts: clicking one fills the form
const DEMO_ACCOUNTS = [
  { role: 'Super admin', access: 'Full access', username: 'superadmin', password: 'super123' },
  { role: 'Admin', access: 'Admin access', username: 'admin', password: 'password123' },
  { role: 'Editor', access: 'Editor access', username: 'editor', password: 'editor123' },
];

// Bars for the decorative chart on the brand panel
const BARS = [38, 52, 44, 66, 58, 78, 70, 92];

const rise = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.25}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          background: 'linear-gradient(145deg, #6C85F0 0%, #3B5BDB 100%)',
          boxShadow: '0 4px 14px rgba(59, 91, 219, 0.45)',
        }}
      >
        <LogoIcon fontSize="small" />
      </Box>
      <Typography
        variant="h6"
        sx={{ color: light ? '#fff' : 'text.primary', fontWeight: 700, letterSpacing: '-0.01em' }}
      >
        {BRAND_NAME}
      </Typography>
    </Stack>
  );
}

function BrandPanel() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        p: { md: 5, lg: 7 },
        color: '#fff',
        bgcolor: '#0B1026',
        backgroundImage: [
          'radial-gradient(60% 50% at 15% 0%, rgba(108, 133, 240, 0.38), transparent 70%)',
          'radial-gradient(50% 45% at 95% 100%, rgba(112, 72, 232, 0.32), transparent 70%)',
        ].join(','),
        // Fine grid that fades out toward the edges
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 45%, #000 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, #000 25%, transparent 75%)',
          pointerEvents: 'none',
        },
        '& > *': { position: 'relative' },
      }}
    >
      <Logo light />

      <Box>
        <Typography
          variant="h2"
          sx={{ color: '#fff', maxWidth: 460, mb: 2, fontSize: { md: '2.125rem', lg: '2.5rem' } }}
        >
          Your numbers, clear at a glance.
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.68)', maxWidth: 420, mb: 6 }}>
          Track activity, manage your team and act on what changed, all from one place.
        </Typography>

        {/* Decorative preview card */}
        <Box
          aria-hidden
          sx={{
            maxWidth: 440,
            p: 3,
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.12)',
            bgcolor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Weekly activity
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#3DD9A4',
                bgcolor: 'rgba(61, 217, 164, 0.14)',
              }}
            >
              Trending up
            </Box>
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={1.25} sx={{ height: 110 }}>
            {BARS.map((h, i) => {
              const isLast = i === BARS.length - 1;
              return (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: '6px 6px 3px 3px',
                    background: isLast
                      ? 'linear-gradient(180deg, #8CA2FF 0%, #3B5BDB 100%)'
                      : 'rgba(255,255,255,0.14)',
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>

      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </Typography>
    </Box>
  );
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/home');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (!success) {
        setError('Incorrect username or password. Check your details and try again.');
      }
    } catch (err) {
      console.error(err);
      setError('We could not sign you in. Try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setUsername(account.username);
    setPassword(account.password);
    setError('');
  };

  if (isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress size={36} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Opening your dashboard
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
        bgcolor: 'background.default',
      }}
    >
      <BrandPanel />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2.5, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            '@media (prefers-reduced-motion: no-preference)': {
              animation: `${rise} 0.5s ease-out`,
            },
          }}
        >
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 5 }}>
            <Logo />
          </Box>

          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            Welcome back
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Sign in to continue to your dashboard.
          </Typography>

          <Collapse in={!!error}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }} role="alert">
              {error}
            </Alert>
          </Collapse>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <TextField
                label="Username"
                size="medium"
                fullWidth
                required
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: 'text.secondary' }} fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                size="medium"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        edge="end"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((v) => !v)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? (
                          <HideIcon fontSize="small" />
                        ) : (
                          <ShowIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading || !username || !password}
                sx={{
                  height: 48,
                  fontSize: '0.9375rem',
                  boxShadow: '0 6px 16px rgba(59, 91, 219, 0.28)',
                  '&.Mui-disabled': { boxShadow: 'none' },
                }}
              >
                {isLoading ? <CircularProgress size={22} color="inherit" /> : 'Sign in'}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography variant="caption" color="text.secondary">
              Demo accounts
            </Typography>
          </Divider>

          <Stack spacing={1}>
            {DEMO_ACCOUNTS.map((account) => (
              <Button
                key={account.username}
                variant="outlined"
                color="inherit"
                onClick={() => fillDemo(account)}
                disabled={isLoading}
                sx={{
                  justifyContent: 'space-between',
                  px: 1.75,
                  py: 1,
                  color: 'text.primary',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {account.role}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {account.access}
                </Typography>
              </Button>
            ))}
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}
          >
            Select an account to fill in its details, then sign in.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}