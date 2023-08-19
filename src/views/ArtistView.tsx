import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import ArtistItem from '../components/ArtistItem';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtists, setArtist, artist } = useContext(MusicContext);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistResponse = await fetchArtists('/genres', id);
        setArtist(artistResponse);
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    fetchArtistData();
  }, [id]);

  return (
    <Grid container spacing={3} sx={{ mt: 0 }} role="list">
      {artist.map((artistItem) => (
        <Grid item xs={5} sm={3} md={2} key={artistItem.id} role="listitem">
          <ArtistItem artist={artistItem} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArtistView;
