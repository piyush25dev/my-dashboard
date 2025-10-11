'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
  CircularProgress,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { Lock as LockIcon, Person as PersonIcon } from '@mui/icons-material';

// Custom animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const AnimatedContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(-45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
  backgroundSize: '400% 400%',
  animation: `${gradientBG} 15s ease infinite`,
  padding: "10px"
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  width: '100%',
  maxWidth: '400px',
  animation: `${fadeIn} 0.6s ease-out`,
}));

const AuthButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
  },
}));

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
}));

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/home');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        height: "100vh",
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: `${gradientBG} 15s ease infinite`,
      }}>
        <CircularProgress size={60} thickness={5} sx={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <AnimatedContainer>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <LoginCard elevation={6}>
          <Box textAlign="center" mb={4}>
            <LockIcon
              sx={{
                fontSize: 60,
                color: 'primary.main',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          <Fade in={!!error}>
            <Box mb={3}>
              <Alert severity="error" sx={{ borderRadius: '8px' }}>
                {error}
              </Alert>
            </Box>
          </Fade>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <InputField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
              />

              <InputField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
              />

              <Grow in={!isLoading}>
                <AuthButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Sign In'
                  )}
                </AuthButton>
              </Grow>
            </Stack>
          </Box>

          <Fade in={!isLoading}>
            <Box mt={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Demo credentials: <strong>admin</strong> / <strong>password123</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Demo credentials:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>superadmin</strong> / <strong>super123</strong> (Full Access)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>admin</strong> / <strong>password123</strong> (Admin Access)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>editor</strong> / <strong>editor123</strong> (Editor Access)
              </Typography>
            </Box>
          </Fade>
        </LoginCard>
      </Slide>
    </AnimatedContainer>
  );
}