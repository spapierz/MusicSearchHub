import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import { Artist } from '../interfaces/Music';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import ArtistDetails from '../components/ArtistDetails';

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
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {artist.map((artist: Artist) => (
            <ArtistDetails artist={artist} />
          ))}
        </>
      )}
    </div>
  );
};

export default ArtistDetailsView;
