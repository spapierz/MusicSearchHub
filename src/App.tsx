import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import ArtistContextProvider from './context/ArtistContext';
import FavoritesButton from './components/FavoritesButton';
import Header from './components/Header';

const LazyGenreView = lazy(() => import('./views/GenreView'));
const LazyArtistDetailView = lazy(() => import('./views/ArtistDetailsView'));
const LazyFavoritesView = lazy(() => import('./views/FavoritesView'));

const LazySearchBar = lazy(() => import('./components/SearchBar'));

const spinnerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const App: React.FC = () => {
  return (
    <ArtistContextProvider>
      <Router>
        <Header />
        <Container sx={{ pt: 8 }} id="root">
          <Suspense fallback={<div style={spinnerStyles}><CircularProgress /></div>}>
            <LazySearchBar />
            <FavoritesButton />
            <Switch>
              <Route path="/genres" render={() => <LazyGenreView />} />
              <Route path="/artist-detail/:id" render={() => <LazyArtistDetailView />} />
              <Route path="/favorites" render={() => <LazyFavoritesView />} />
              <Redirect exact from="/" to="/genres" />
              {/* Add a default route or a 404 page here */}
            </Switch> 
          </Suspense>
        </Container>
      </Router>
    </ArtistContextProvider>
  );
};

export default App;
