import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import ArtistItem from '../components/ArtistItem';
import BackButton from '../components/BackButton';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtists, artist, favorites } = useContext(MusicContext);
  const location = useLocation();
  const displayedArtists = location.pathname.includes('favorites') ? favorites : artist;

  useEffect(() => {
    if (location.pathname !== '/favorites') {
      fetchArtists('/genres', id);
    }
  }, [id, fetchArtists]);
  return (
    <>
      <BackButton />
      <Grid container spacing={3} sx={{ mt: 0 }} role="list">
        <>{console.log('hi', artist)}</>
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
    </>
  );
};

export default ArtistView;
