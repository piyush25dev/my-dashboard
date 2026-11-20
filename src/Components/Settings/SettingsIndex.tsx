'use client';

import { Box, Button, Card, Stack, Typography, TextField, Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, IconButton } from '@mui/material';
import { Lock, Notifications, Language, Palette, Security, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    // Remove darkMode from local state since we're using context
    notifications: true,
    emailNotifications: true,
    language: 'English',
    timezone: 'GMT-8:00 Pacific Time',
  });

  // Password Dialog State
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = <K extends keyof typeof settings>(field: K, value: typeof settings[K]) => {
    setSettings({ ...settings, [field]: value });
  };

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSubmit = () => {
    // Add your password validation and change logic here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // TODO: Add actual password change logic
    console.log('Password change submitted', passwordData);
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Settings
      </Typography>

      {/* Password Change Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <TextField
              label="Current Password"
              variant="outlined"
              fullWidth
              type={showPassword.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => toggleShowPassword('current')}
                      edge="end"
                    >
                      {showPassword.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type={showPassword.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => toggleShowPassword('new')}
                      edge="end"
                    >
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              type={showPassword.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              error={passwordData.newPassword !== passwordData.confirmPassword}
              helperText={passwordData.newPassword !== passwordData.confirmPassword ? "Passwords don't match" : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => toggleShowPassword('confirm')}
                      edge="end"
                    >
                      {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button 
            onClick={handlePasswordSubmit} 
            variant="contained"
            disabled={
              !passwordData.currentPassword || 
              !passwordData.newPassword || 
              !passwordData.confirmPassword ||
              passwordData.newPassword !== passwordData.confirmPassword
            }
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rest of the settings content */}
      <Card sx={{ p: 3, mb: 3, boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <Palette sx={{ verticalAlign: 'middle', mr: 1 }} />
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
            />
          }
          label="Dark Mode"
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary" pl={4}>
          {isDarkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
        </Typography>
      </Card>

      <Card sx={{ p: 3, mb: 3, boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <Notifications sx={{ verticalAlign: 'middle', mr: 1 }} />
          Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
            />
          }
          label="Enable Notifications"
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              disabled={!settings.notifications}
            />
          }
          label="Email Notifications"
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary" pl={4}>
          {settings.notifications ? 'You will receive notifications' : 'Notifications are disabled'}
        </Typography>
      </Card>

      <Card sx={{ p: 3, mb: 3, boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <Language sx={{ verticalAlign: 'middle', mr: 1 }} />
          Language & Region
        </Typography>
        <TextField
          select
          fullWidth
          label="Language"
          value={settings.language}
          onChange={(e) => handleChange('language', e.target.value)}
          SelectProps={{
            native: true,
          }}
          sx={{ mb: 2 }}
        >
          {['English', 'Spanish', 'French', 'German', 'Chinese'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Timezone"
          value={settings.timezone}
          onChange={(e) => handleChange('timezone', e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {[
            'GMT-8:00 Pacific Time',
            'GMT-5:00 Eastern Time',
            'GMT+0:00 London',
            'GMT+1:00 Paris',
            'GMT+8:00 Beijing',
          ].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Card>

      <Card sx={{ p: 3, boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <Security sx={{ verticalAlign: 'middle', mr: 1 }} />
          Security
        </Typography>
        <Stack spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<Lock />}
            onClick={() => setOpenPasswordDialog(true)}
          >
            Change Password
          </Button>
          <Button variant="outlined" color="error">
            Delete Account
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}