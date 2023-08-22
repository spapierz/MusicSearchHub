import React, { useState, useEffect, useContext } from 'react';
import { Artist } from '../interfaces/Music';
import { Typography, IconButton, Grid, Skeleton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import ImageSkeleton from './ImageSkeleton';

interface MusicItemProps {
  artist: Artist;
}

const logo = "/images/genreGaze-logo.png";

export const ArtistItem: React.FC<MusicItemProps> = ({ artist }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    history.push(`/artist-details/${artist.id}`);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Grid container sx={{ position: 'relative', cursor: 'pointer' }} role="list">
      <picture style={{ position: 'relative', display: 'block' }}>
        <source
          type="image/webp"
          srcSet={`${artist.image ? artist.image.replace(/\.(jpg|jpeg|png)$/, '.webp') : ''}`}
        />
        <img
          src={artist.image ? artist.image.replace(/\.(jpg|jpeg|png)$/, '.webp') : logo}
          alt={artist.name}
          className={`blurred-image ${imageLoaded ? 'loaded-image' : ''}`}
          style={{
            height: '229px',
            width: '180px',
            objectFit: 'cover',
            borderRadius: '10px',
            position: 'relative',
            visibility: imageLoaded ? 'visible' : 'hidden',
            filter: imageLoaded ? 'blur(0)' : 'blur(8px)',
            transition: 'filter 0.5s ease-in-out',
          }}
          sizes="(max-width: 600px) 100vw, 50vw"
          onClick={handleImageClick}
          width='180px'
          height='229px'
          loading="lazy"
          onLoad={handleImageLoaded}
        />
        {!imageLoaded && <ImageSkeleton />}
      </picture>

      <Grid item style={{
        position: 'absolute',
        top: 168,
        right: 10,
        zIndex: 1,
      }}>
        <IconButton onClick={handleToggleFavorite} aria-label={isFavorite ? 'favorited heart icon' : 'not yet favorited heart icon'}>
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
            }} />
          }
        </IconButton>
      </Grid>
      <Grid item style={{
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
      </Grid>
    </Grid>
  );
};

export default React.memo(ArtistItem);
