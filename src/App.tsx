import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import ArtistContextProvider from './context/MusicContext';
import FavoritesButton from './components/FavoritesButton';
import Header from './components/Header';

const LazyArtistView = lazy(() => import('./views/ArtistView'));
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
        <Suspense fallback={<div style={spinnerStyles}><CircularProgress /></div>}>
          <Container>
            <Header />
            <Route render={({ location }) => (
              (location.pathname.includes('/genres') || location.pathname.split('/').pop() == 'artists') && <LazySearchBar />
            )} />
            <Switch>
              <Route path="/genres/:id/:artists" render={() => <LazyArtistView />} />
              <Route path="/artist-detail/:id" render={() => <LazyArtistDetailView />} />
              <Route path="/favorites" render={() => <LazyFavoritesView />} />
              <Redirect exact from="/" to="/genres" />
              {/* Add a default route or a 404 page here */}
            </Switch>
          </Container> 
        </Suspense>
      </Router>
    </ArtistContextProvider>
  );
};

export default App;
