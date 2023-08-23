import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

const spinnerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const ArtistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artist } = useContext(MusicContext);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <h2>Artist Details</h2>
      {isLoading ? (
        <div style={spinnerStyles}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <img
                    src={'/'}
                    alt={'artist.name'}
                    style={{
                      height: '229px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                    loading="lazy"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" fontWeight="bold">
                    artist name
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {/* Display additional details here */}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Popularity: popularity
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Additional Genres</Typography>
              {/* Display additional genres here */}
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <Typography variant="body2">Add to Favorites</Typography>
              <Button size="small" startIcon={<FavoriteBorder />}>
                Add
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </div>
  );
};

export default ArtistDetails;
