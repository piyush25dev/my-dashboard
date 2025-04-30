'use client';

import {  Box, Button, Card,  Stack, Typography, TextField, Switch, FormControlLabel } from '@mui/material';
import { Lock, Notifications, Language, Palette, Security } from '@mui/icons-material';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    language: 'English',
    timezone: 'GMT-8:00 Pacific Time',
  });

  const handleChange = <K extends keyof typeof settings>(field: K, value: typeof settings[K]) => {
    setSettings({ ...settings, [field]: value });
  };
  

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <Palette sx={{ verticalAlign: 'middle', mr: 1 }} />
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
            />
          }
          label="Dark Mode"
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary" pl={4}>
          {settings.darkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
        </Typography>
      </Card>

      <Card sx={{ p: 3, mb: 3 }}>
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

      <Card sx={{ p: 3, mb: 3 }}>
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

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <Security sx={{ verticalAlign: 'middle', mr: 1 }} />
          Security
        </Typography>
        <Stack spacing={2}>
          <Button variant="outlined" startIcon={<Lock />}>
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