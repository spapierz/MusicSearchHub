import React, { useCallback } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { MusicNote } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom';

const FavoritesButton: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handleOnClick = useCallback(() => {
    history.push('/favorites');
  }, [history]);
  

  return (
    <div>
      {location.pathname !== '/favorites' && (
        <Grid
          container
          justifyContent="flex-end"
          spacing={1}
        >
          <Grid item>
            <MusicNote fontSize="large" sx={{ color: '#FF007F', cursor: 'pointer' }} />
          </Grid>
          <Grid item>
            <Button
              disableRipple={true}
              sx={{ textTransform: 'none', pr: 2, pl: 0, cursor: 'pointer' }}
              onClick={handleOnClick}
            >
              <Typography variant="h6" sx={{ color: 'black', fontWeight: 500 }}>
                View My List
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default FavoritesButton;
