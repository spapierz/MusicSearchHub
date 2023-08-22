import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import ArtistItem from '../components/ArtistItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtists, artist, favorites } = useContext(MusicContext);
  const location = useLocation();
  const displayedArtists = location.pathname.includes('favorites') ? favorites : artist;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.pathname !== '/favorites') {
        fetchArtists('/genres', id).then(() => {
          setIsLoading(false); // Set isLoading to false after fetching data
        });
      } else {
        setIsLoading(false); // Set isLoading to false for the favorites page
      }
    }, 200); // Add a delay of 500 milliseconds

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [id, fetchArtists, location.pathname]);

  return (
    <>
      <BackButton />
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3} sx={{ mt: 0 }} role="list">
          {displayedArtists.map((artistItem) => (
            <Grid item xs={5} sm={3} md={2} key={artistItem.id} role="listitem">
              <ArtistItem artist={artistItem} />
            </Grid>
          ))}
          {displayedArtists.length === 0 && (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '18px',
                height: '50vh'
              }}
            >
              <Typography>No Favorites On The List</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default ArtistView;
