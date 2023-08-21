import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import { Artist } from '../interfaces/Music';
import CircularProgress from '@mui/material/CircularProgress';
import BackButton from '../components/BackButton';

const spinnerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

const ArtistDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtistDetails, artist } = useContext(MusicContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetchArtistDetails(id);
        setIsLoading(false);
        return res;
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchDetails();
  }, [id, fetchArtistDetails, location.pathname]);

  return (
    <div>
      <BackButton />
      <h2>Artist Details</h2>
      {isLoading ? (    
        <div style={spinnerStyles}><CircularProgress /></div>
      ) : (
        <ul>
          {artist.map((artist: Artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistDetailsView;
