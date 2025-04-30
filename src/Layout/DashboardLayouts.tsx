'use client';

import { useEffect, useState } from 'react';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const drawerWidth = 240;

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
    marginLeft: open ? `${drawerWidth}px` : 0,
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
  },
}));

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface UserData {
  name?: string;
  email?: string;
  avatar?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(isMdUp);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Get user data from local storage if token exists
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

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    router.push('/login');
  };

  const mainNavItems: NavItem[] = [
    { text: 'Dashboard', path: '/dashboard/home', icon: <DashboardIcon /> },
    { text: 'Users', path: '/dashboard/users', icon: <PeopleIcon /> },
    { text: 'Orders', path: '/dashboard/orders', icon: <ShoppingCartIcon /> },
    { text: 'Reports', path: '/dashboard/reports', icon: <AssessmentIcon /> },
  ];

  const secondaryNavItems: NavItem[] = [
    { text: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon /> },
    { text: 'Profile', path: '/dashboard/profile', icon: <PersonIcon /> },
    { 
      text: 'Logout', 
      path: '/login', 
      icon: <ExitToAppIcon />,
      onClick: handleLogout
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (!isMdUp) setOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  const drawerContent = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {mainNavItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 3,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  boxShadow: '0px 2px 8px 4px rgba(74, 169, 247, 0.3)',
                  '& .MuiListItemIcon-root': {
                    color: '#fff', 
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main, 
                  },
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryNavItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  handleNavigation(item.path);
                }
              }}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 3,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  boxShadow: '0px 2px 8px 4px rgba(74, 169, 247, 0.3)',
                  '& .MuiListItemIcon-root': {
                    color: '#fff', 
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main, 
                  },
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, ...(open && isMdUp && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          
          {userData && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ display: {xs: "none", sm: "flex"}, mr: 2 }}>
                {userData.name || userData.email}
              </Typography>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <Avatar 
                  alt={userData.name} 
                  src={userData.avatar} 
                  sx={{ width: 32, height: 32 }}
                >
                  {userData.name ? userData.name.charAt(0) : userData.email ? userData.email.charAt(0) : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{mt: {xs: 5, sm: 6}}}
              >
                <MenuItem onClick={() => {
                  handleMenuClose();
                  router.push('/dashboard/profile');
                }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => {
                  handleMenuClose();
                  router.push('/dashboard/settings');
                }}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
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
        <DrawerHeader />
        <Box sx={{ p: { xs: 0, sm: 1 } }}>{children}</Box>
      </Main>
    </Box>
  );
}