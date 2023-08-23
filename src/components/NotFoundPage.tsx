import React from 'react';
import { Grid, Typography } from '@mui/material';
import { MusicOff } from '@mui/icons-material';
import BackButton from './BackButton';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <BackButton />
      <Grid
        container
        sx={{
          mt: 3,
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Grid item xs={12}>
          <MusicOff fontSize="large" color="error" />
          <Typography variant="h5" sx={{ mt: 3 }}>Oops! Page Not Found.</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFoundPage;
