'use client';

import { Avatar, Box, Button, Card, Divider, Stack, Typography, TextField, IconButton } from '@mui/material';
import { Email, Phone, LocationOn, Edit, Save, CameraAlt } from '@mui/icons-material';
import { useState, useRef, ChangeEvent } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Senior Product Manager with 8 years of experience leading cross-functional teams to deliver successful products.',
    avatar: '/avatars/1.jpg', // Default avatar path
  });
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to API here
    // Update the profile with the new avatar preview
    setProfile(prev => ({ ...prev, avatar: avatarPreview }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>

      <Card sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)' }}>
        <Stack direction="row" spacing={3} alignItems="center" mb={3}>
          <Box position="relative">
            <Avatar
              src={avatarPreview}
              sx={{ width: 120, height: 120 }}
            />
            {isEditing && (
              <>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                  onClick={triggerFileInput}
                >
                  <CameraAlt />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </>
            )}
          </Box>
          <Box flex={1}>
            {isEditing ? (
              <TextField
                fullWidth
                label="Name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                margin="normal"
              />
            ) : (
              <Typography variant="h4" fontWeight="bold">
                {profile.name}
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary">
              Product Manager
            </Typography>
          </Box>
          {isEditing ? (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <ProfileField
            icon={<Email />}
            label="Email"
            value={profile.email}
            editing={isEditing}
            onChange={(value) => setProfile({...profile, email: value})}
          />
          <ProfileField
            icon={<Phone />}
            label="Phone"
            value={profile.phone}
            editing={isEditing}
            onChange={(value) => setProfile({...profile, phone: value})}
          />
          <ProfileField
            icon={<LocationOn />}
            label="Location"
            value={profile.location}
            editing={isEditing}
            onChange={(value) => setProfile({...profile, location: value})}
          />
        </Stack>
      </Card>

      <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 10px 25px rgba(74, 169, 247, 0.3)' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          About Me
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Bio"
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        ) : (
          <Typography paragraph>
            {profile.bio}
          </Typography>
        )}
      </Card>
    </Box>
  );
}

function ProfileField({ icon, label, value, editing, onChange }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
      <Box flex={1}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        {editing ? (
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <Typography>{value}</Typography>
        )}
      </Box>
    </Stack>
  );
}