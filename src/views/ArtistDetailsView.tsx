import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import { Artist } from '../interfaces/Music';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ArtistDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArtistDetails, artist } = useContext(MusicContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchArtistDetails(id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchDetails();
  }, [id, fetchArtistDetails]);

  return (
    <div>
      <BackButton />
      <h2>Artist Details</h2>
      {isLoading ? (
        <Spinner />
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
