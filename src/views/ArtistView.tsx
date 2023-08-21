import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import ArtistItem from '../components/ArtistItem';
import BackButton from '../components/BackButton';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtists, setArtist, artist, favorites } = useContext(MusicContext);
  const location = useLocation();
  const displayedArtists = location.pathname.includes('favorites') ? favorites : artist;

  const fetchArtistData = async () => {
    try {
      const artistResponse = await fetchArtists('/genres', id);
      setArtist(artistResponse);
      return artistResponse;
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  useEffect(() => {
    if (location.pathname !== '/favorites') {
      fetchArtistData();
    }
  }, [id, location.pathname]);

  return (
    <>
      <BackButton />
      <Grid container spacing={3} sx={{ mt: 0 }} role="list">
        {displayedArtists.length ? (
          displayedArtists.map((artistItem) => (
            <Grid item xs={5} sm={3} md={2} key={artistItem.id} role="listitem">
              <ArtistItem artist={artistItem} />
            </Grid>
          ))
        ) : (
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
