import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import { Artist } from '../interfaces/Music';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import ArtistDetails from '../components/ArtistDetails';
import ArtistItem from '../components/ArtistItem';
import { Grid } from '@mui/material';

const ArtistDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtistDetails, fetchSimilarArtists, similarArtists, artist } = useContext(MusicContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMusicArtistDetails = async () => {
    try {
      await fetchArtistDetails(id);
      await fetchSimilarArtists(id)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching artist details:', error);
    }
  };

  useEffect(() => {
    fetchMusicArtistDetails();
  }, [id]);

  return (
    <div>
      <BackButton />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>Artist Details</h2>
          {artist.map((artist: Artist) =>
            <ArtistDetails artist={artist} />
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2 style={{ marginTop: '3rem', marginBottom: 0 }}>Similar Artists</h2>
              <Grid container spacing={3} sx={{ mt: 0 }} role="list">
                {similarArtists.map((artist: Artist) =>
                  <Grid item xs={5} sm={3} md={2} role="listitem">
                    <ArtistItem artist={artist} />
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ArtistDetailsView;
