import React, { useContext, useEffect, useState } from 'react';
import { Artist } from '../interfaces/Music';
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { MusicContext } from '../context/MusicContext';
import { Star, StarBorder } from '@mui/icons-material';

interface MusicItemProps {
  artist: Artist;
}

const logo = "/images/genreGaze-logo.png";

const ArtistDetails: React.FC<MusicItemProps> = ({ artist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToFavorites, removeFromFavorites, favorites } = useContext(MusicContext);

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

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const PrimaryGenre = () => {
    return artist.genres.map(genre => (
      genre.is_primary === 1 && genre.name
    ))
  };

  const AllGenres = () => {
    const genreNames = artist.genres.map(genre => genre.name);
    const formattedGenres = genreNames.join(', ');
  
    return (
      <Typography variant="body2" color="textSecondary">
        {formattedGenres}
      </Typography>
    );
  };

  return (
    <>
      <h2>Artist Details</h2>
        <Card sx={{ maxWidth: 700 }}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
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
                    width='180px'
                    height='229px'
                    loading="lazy"
                    onLoad={handleImageLoaded}
                  />
                </picture>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" fontWeight="bold">
                  {artist.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
                  Primary Genre: <PrimaryGenre />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Popularity Score: {artist.popularity}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography variant="h6">Additional Genres</Typography>
                <AllGenres />
              </div>
              <div>
                <CardActions sx={{ justifyContent: 'flex-end', pr: 0 }}>
                  <IconButton onClick={handleToggleFavorite} aria-label={isFavorite ? 'favorited star icon' : 'not yet favorited star icon'}>
                    {isFavorite ? 
                      <Star
                        style={{
                          color: '#FF007F',
                          fontSize: '24px',
                          border: '2px solid #FF007F',
                          borderRadius: '50%',
                          padding: '5px'
                        }}
                      />
                    :
                      <StarBorder
                        style={{
                          color: '#FF007F',
                          fontSize: '24px',
                          border: '2px solid #FF007F',
                          borderRadius: '50%',
                          padding: '5px'
                        }}
                      />
                    }
                  </IconButton>
                </CardActions>
              </div>
            </div>
          </CardContent>
        </Card>
    </>
  );
};

export default ArtistDetails;
