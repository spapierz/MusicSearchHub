import React, { Suspense, lazy } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import ArtistContextProvider from './context/ArtistContext';
import FavoritesButton from './components/FavoritesButton';
import PageTitle from './components/PageTitle';

const LazyArtistList = lazy(() => import('./components/ArtistList'));
const LazySearchBar = lazy(() => import('./components/SearchBar'));

const title = 'GenreGaze';
const logo = "./assets/images/genreGaze-icon.png";

const spinnerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const App: React.FC = () => {
  return (
    <ArtistContextProvider>
      <Container sx={{ pt: 8 }} id="root">
        <Typography variant="h2" gutterBottom>
          {title} <img alt="GenreGaze logo" width="70px" height="auto" src={logo} />
        </Typography>
        <Suspense fallback={<div style={spinnerStyles}><CircularProgress /></div>}>
          <LazySearchBar />
          <FavoritesButton />
          <PageTitle />
          <LazyArtistList />
        </Suspense>
      </Container>
    </ArtistContextProvider>
  );
};

export default App;
