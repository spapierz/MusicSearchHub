import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { Artist } from '../interfaces/Music';

const spinnerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

interface MusicItemProps {
  artist: Artist;
}

const logo = "/images/genreGaze-logo.png";

const ArtistDetails: React.FC<MusicItemProps> = ({ artist }) => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtistDetails } = useContext(MusicContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchDetails = async () => {
    try {
      const res = await fetchArtistDetails(id);
      setIsLoading(false);
      return res;
    } catch (error) {
      console.error('Error fetching artist details:', error);
    }
  };
  
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <h2>Artist Details</h2>
      {isLoading ? (    
        <div style={spinnerStyles}><CircularProgress /></div>
      ) : (
        <>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                <img
                  src={artist.image ?? logo}
                  alt={artist.name}
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
                    {artist.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    hi
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Popularity:
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
