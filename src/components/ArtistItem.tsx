import React, { useState, useEffect, useContext } from 'react';
import { Artist } from '../interfaces/Music';
import { Typography, IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';

interface MusicItemProps {
  artist: Artist;
}

const logo = "./images/genreGaze-logo.png";

export const ArtistItem: React.FC<MusicItemProps> = ({ artist }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToFavorites, removeFromFavorites, favorites } = useContext(MusicContext);
  const history = useHistory();

  useEffect(() => {
    setIsFavorite(favorites.some((favArtist) => favArtist.id === artist.id));
  }, [favorites, artist.id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(artist.id);
    } else {
      addToFavorites(artist);
    }
    setIsFavorite(!isFavorite);
  };

  const handleImageClick = () => {
    history.push(`/api/v1/music/artists/${artist.id}`);
  };

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <img
        src={artist.image ? artist.image : logo}
        alt={artist.name}
        style={{
          height: '229px',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
        onClick={handleImageClick}
      />
      <div style={{
        position: 'absolute',
        top: 168,
        right: 10,
        zIndex: 1,
      }}>
        <IconButton onClick={handleToggleFavorite} aria-label={isFavorite ? 'favorited star icon' : 'not yet favorited star icon'}>
          {isFavorite ? 
            <Star style={{
                color: 'white',
                fontSize: '24px',
                border: '2px solid white',
                borderRadius: '50%',
                padding: '5px'
              }}
            /> :
            <StarBorder style={{
                color: 'white',
                fontSize: '24px',
                border: '2px solid white',
                borderRadius: '50%',
                padding: '5px'
              }} />}
        </IconButton>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '8px 8px 8px 0',
        borderRadius: '0 0 10px 10px',
      }}>
        <Typography variant="subtitle2" gutterBottom>
          {artist.name}
        </Typography>
      </div>
    </div>
  );
};

export default ArtistItem;