import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import ArtistContextProvider from './context/MusicContext';
import Header from './components/Header';
import NotFoundPage from './components/NotFoundPage';

const LazyGenresView = lazy(() => import('./views/GenresView'));
const LazyArtistView = lazy(() => import('./views/ArtistView'));
const LazyArtistDetailView = lazy(() => import('./views/ArtistDetailsView'));
const LazySearchBar = lazy(() => import('./components/SearchBar'));

const App: React.FC = () => {
  return (
    <ArtistContextProvider>
      <Router>
        <Container>
          <Header />
          <Suspense fallback={<CircularProgress />}>
            <Route
              path="/genres"
              render={({ location }) =>
                (location.pathname.includes('/genres') || location.pathname.split('/').pop() === 'artists') && (
                  <LazySearchBar />
                )
              }
            />
            <Switch>
              <Route path="/genres/:id/:artists" component={LazyArtistView} />
              <Route path="/artist-details/:id" component={LazyArtistDetailView} />
              <Route path="/favorites" component={LazyArtistView} />
              <Route path="/genres" component={LazyGenresView} />
              <Redirect exact from="/" to="/genres" />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </Container>
      </Router>
    </ArtistContextProvider>
  );
};

export default App;
