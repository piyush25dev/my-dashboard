'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  MenuRounded as MenuIcon,
  ChevronLeftRounded as ChevronLeftIcon,
  ChevronRightRounded as ChevronRightIcon,
  DashboardRounded as DashboardIcon,
  PeopleAltOutlined as PeopleIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  AssessmentOutlined as AssessmentIcon,
  SettingsOutlined as SettingsIcon,
  PersonOutlineRounded as PersonIcon,
  LogoutRounded as LogoutIcon,
  SupervisedUserCircleOutlined as SuperAdminIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/users';

const BRAND_NAME = 'Dashboard';
const drawerWidth = 256;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100%',
  overflowX: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    marginLeft: open ? `${drawerWidth}px` : 0,
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
    },
  }),
}));

// Same height as the app bar so the sidebar header lines up with it
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

interface NavItem {
  text: string;
  path: string;
  icon: ReactNode;
}

interface UserData {
  name?: string;
  email?: string;
  avatar?: string;
  role?: Role;
}

// "SuperAdmin" -> "Super admin"
const formatRole = (role?: string) =>
  role ? role.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().replace(/^./, (c) => c.toUpperCase()) : '';

function LogoMark() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '9px',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          background: 'linear-gradient(145deg, #6C85F0 0%, #3B5BDB 100%)',
          boxShadow: '0 3px 10px rgba(59, 91, 219, 0.35)',
        }}
      >
        <DashboardIcon sx={{ fontSize: 20 }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
        {BRAND_NAME}
      </Typography>
    </Box>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(isMdUp);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Keep the drawer in sync with the screen size (open on desktop, closed on mobile)
  useEffect(() => {
    setOpen(isMdUp);
  }, [isMdUp]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const storedUserData = localStorage.getItem('userData');
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        } catch (error) {
          console.error('Failed to parse user data from local storage', error);
        }
      }
    }
  }, [isAuthenticated, router]);

  const handleDrawerToggle = () => setOpen((v) => !v);
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    router.push('/login');
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (!isMdUp) setOpen(false);
  };

  const mainNavItems = useMemo<NavItem[]>(() => {
    const items: NavItem[] = [
      { text: 'Dashboard', path: '/dashboard/home', icon: <DashboardIcon /> },
      { text: 'Users', path: '/dashboard/users', icon: <PeopleIcon /> },
      { text: 'Orders', path: '/dashboard/orders', icon: <ShoppingCartIcon /> },
      { text: 'Reports', path: '/dashboard/reports', icon: <AssessmentIcon /> },
    ];
    if (userData?.role === 'SuperAdmin') {
      items.splice(1, 0, {
        text: 'Super Admin',
        path: '/dashboard/super-admin',
        icon: <SuperAdminIcon />,
      });
    }
    return items;
  }, [userData?.role]);

  const accountNavItems: NavItem[] = [
    { text: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon /> },
    { text: 'Profile', path: '/dashboard/profile', icon: <PersonIcon /> },
  ];

  // Also highlights nested routes, e.g. /dashboard/users/42 keeps "Users" active
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const pageTitle =
    [...mainNavItems, ...accountNavItems].find((item) => isActive(item.path))?.text ?? BRAND_NAME;

  const displayName = userData?.name || userData?.email || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const renderNavList = (items: NavItem[]) => (
    <List disablePadding>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            onClick={() => handleNavigation(item.path)}
            selected={isActive(item.path)}
            sx={{ flex: 1 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'inherit' }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <DrawerHeader>
        <LogoMark />
        <IconButton size="small" onClick={handleDrawerToggle} aria-label="Close sidebar">
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Box sx={{ flex: 1, overflowY: 'auto', py: 1.5 }}>
        {renderNavList(mainNavItems)}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', fontWeight: 600, px: 3, pt: 3, pb: 1 }}
        >
          Account
        </Typography>
        {renderNavList(accountNavItems)}
      </Box>

      {/* Signed-in user */}
      {userData && (
        <Box
          sx={{
            m: 1.5,
            p: 1.25,
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            borderRadius: '12px',
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Avatar
            alt={userData.name}
            src={userData.avatar}
            sx={{
              width: 36,
              height: 36,
              fontSize: '0.9375rem',
              fontWeight: 600,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            {initial}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {displayName}
            </Typography>
            {userData.role && (
              <Typography variant="caption" color="text.secondary" noWrap component="div">
                {formatRole(userData.role)}
              </Typography>
            )}
          </Box>
          <Tooltip title="Logout">
            <IconButton size="small" onClick={handleLogout} aria-label="Logout">
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  if (!isAuthenticated) return null;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="Open sidebar"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 1, ...(open && isMdUp && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" noWrap component="h1" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>

          {userData && (
            <>
              <Box
                component="button"
                type="button"
                onClick={handleMenuOpen}
                aria-label="Account menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  cursor: 'pointer',
                  py: 0.5,
                  pl: { xs: 0.5, sm: 1.5 },
                  pr: 0.5,
                  borderRadius: '999px',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'background-color 0.15s',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                    {displayName}
                  </Typography>
                  {userData.role && (
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                      {formatRole(userData.role)}
                    </Typography>
                  )}
                </Box>
                <Avatar
                  alt={userData.name}
                  src={userData.avatar}
                  sx={{
                    width: 34,
                    height: 34,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  {initial}
                </Avatar>
              </Box>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                slotProps={{ paper: { sx: { mt: 1, minWidth: 220, borderRadius: '12px' } } }}
              >
                <Box sx={{ px: 2, py: 1.25 }}>
                  <Typography variant="subtitle2" noWrap>
                    {displayName}
                  </Typography>
                  {userData.email && (
                    <Typography variant="caption" color="text.secondary" noWrap component="div">
                      {userData.email}
                    </Typography>
                  )}
                </Box>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    router.push('/dashboard/profile');
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    router.push('/dashboard/settings');
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMdUp ? 'persistent' : 'temporary'}
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Main open={open}>
        <Toolbar />
        <Box sx={{ pt: { xs: 1, sm: 2 } }}>{children}</Box>
      </Main>
    </Box>
  );
}